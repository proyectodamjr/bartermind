import express from 'express'
import session from 'express-session'
import path from 'path'
import {pool} from './db.js'
import { PORT } from './config.js'
import bodyParser from 'body-parser'
import { upload } from './middlewares/multer.js'


const app = express()
const __dirname = process.cwd()
const viewsPath = path.join(__dirname, '../vista');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/vista');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname + '/vista/index.html'));
})

app.use(express.static('./vista'))
app.use("/js", express.static('./js'))
app.use("/css", express.static('./css'))
app.use("/vite", express.static('./vite'))
app.use("/images", express.static("./images"));
app.use("/uploads", express.static("./uploads"));
app.use(express.static(viewsPath));

app.use((req, res, next) => {
    if (req.url.endsWith('.jsx')) {
        res.type('application/javascript');
    }
    next();
});

// Ruta para servir inicio.html desde vite
app.get('/inicio.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/vite/inicio.html'));
});

// Ruta para servir upload.html desde vite
app.get('/upload.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/vite/upload.html'));
});

// Ruta para el perfil del usuario
app.get('/perfil.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/vite/perfil.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});



// Ruta para manejar las solicitudes de inicio de sesión
app.post('/login', async (req, res) => {

    let correo = req.body.correo;
    let pass = req.body.contra;
    
    var [results1] = await pool.query('DELETE FROM videos WHERE id = 1');
    console.log({body:req.body})

    if (correo && pass) {

        var [results] = await pool.query('SELECT correo, contrasena, nombre, id FROM usuarios WHERE correo = ? AND contrasena = ?', [correo, pass])

        if (results.length <= 0) {
            console.log("hay un error")
            return res.status(401).json({ success: false, message: "Credenciales incorrectas. Intente de nuevo." });
        } else{
            req.session.nombreUsuario = results[0].nombre;
            req.session.idUsuario = results[0].id;

            console.log(results)
            return res.status(200).json({ success: true, message: "Inicio de sesión exitoso." });
        }

    } else {
        return res.status(400).json({ success: false, message: "Por favor rellene bien los campos." });
    }

});

// Ruta para manejar las solicitudes de crear cuenta
app.post('/signup', async (req, res) => {

    let usuario = req.body.usuario;
    let correo = req.body.correo;
    let pass = req.body.contra;
    
    console.log({body:req.body})

    if (correo && pass && usuario) {

        var [results] = await pool.query('INSERT INTO usuarios(correo, contrasena, nombre) VALUES(?,?,?) ', [correo, pass, usuario]);

        if (!results.affectedRows) {
            console.log("hay un error")
            return res.status(401).json({ success: false, message: "Credenciales incorrectas. Intente de nuevo." });
        } else {
            console.log(results)
            return res.status(200).json({ success: true, message: "Cuenta creada con éxito." });
        }

    } else {
        return res.status(400).json({ success: false, message: "Por favor rellene bien los campos." });
    }

});

// Ruta para manejar las solicitudes de búsqueda
app.post('/search', async (req, res) => {
    const query = req.body.query;

    if (query) {
        var [results] = await pool.query('SELECT nombre FROM usuarios WHERE nombre LIKE ?', [`%${query}%`]);
        return res.status(200).json({ results });
    } else {
        return res.status(400).json({ message: "Por favor ingrese un término de búsqueda." });
    }
});

// Ruta para manejar las solicitudes de categorias
app.post('/categorias', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT id, nombre FROM categoria');

        return res.status(200).json({ results });
    } catch (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).json({ message: "Error en el servidor." });
    }
});

// Ruta para obtener el nombre del usuario
app.get('/api/nombreUsuario', (req, res) => {
    const nombreUsuario = req.session.nombreUsuario; 
    res.json({ nombreUsuario });
});

// Ruta para obtener la lista de comentarios filtrados por usuarios_id
app.get('/api/comentarios', async (req, res) => {
  
    var [results] = await pool.query('SELECT c.id as id, c.idCurso, c.comentario as comentario, ' +
    ' c.comentarista_id1, c.aceptado as aceptado, u.nombre as nombre '+
    ' FROM comentario c JOIN usuarios u ON c.comentarista_id1 = u.id ' +
    ' WHERE usuarios_id = ? ', [req.session.idUsuario]);
    
    res.json(results);

});

// Ruta para aceptar un comentario
app.post('/api/comentarios/aceptar/:id', async (req, res) => {
    const comentarioId = req.params.id;

    var [results] = await pool.query('UPDATE comentario SET aceptado = "Y" WHERE id = ? ', [comentarioId]);

    if (!results.affectedRows) {
        console.log("hay un error")
        return res.status(401).json({ success: false, message: "No se encontró el comentario o ya está aceptado." });
    } else {
        console.log(results)
        return res.status(200).json({ success: true, message: "Comentario aceptado exitosamente." });
    }
});
  
// Ruta para subir videos
app.post('/api/users/upload',upload.single('file'), async (req, res) => {
   
    var [result] = await pool.query('SELECT id FROM categoria WHERE nombre = ? ', [req.body.category]);

    console.log("id de categoria: ", result[0].id)
    console.log({'req.body': req.body})
    console.log({'req.file': req.file})
    console.log(req.session.idUsuario )
    console.log(req.body.caption )
    console.log(req.body.category )

    var [results] = await pool.query('INSERT INTO videos(enlace, categoria_id, usuarios_id, titulo) VALUES(?,?,?,?) ', [req.file.filename, result[0].id, req.session.idUsuario, req.body.caption]);

    if (!results.affectedRows) {
        console.log("hay un error")
        return res.status(401).json({ success: false, message: "Ha habido un error. Intente de nuevo." });
    } else {
        console.log(results)
        return res.status(200).json({ success: true, message: "Video subido con éxito." });
    }

})

// Ruta para obtener todos los videos
app.get('/api/videos', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT enlace FROM videos');
        const videoUrls = results.map(result => result.enlace);
        return res.status(200).json({ videoUrls });
    } catch (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).json({ message: "Error en el servidor." });
    }
});


// Ruta para eliminar un video por su id
app.delete('/eliminarVideo', async (req, res) => {
    pool.query('DELETE * FROM videos WHERE id = 1');
});
