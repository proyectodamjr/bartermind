import express from 'express'
import session from 'express-session'
import path from 'path'
import fs from 'fs'
import {pool} from './db.js'
import { PORT } from './config.js'
import bodyParser from 'body-parser'
import { upload } from './middlewares/multer.js'
import { Console } from 'console'


const app = express()
const __dirname = process.cwd()
const buildPath = path.join(__dirname, './react');

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

app.use("/js", express.static('./js'))
app.use("/css", express.static('./css'))
app.use("/vite", express.static('./vite'))
app.use("/images", express.static("./images"));
app.use("/uploads", express.static("./uploads"));

// Middleware para verificar si hay sesión
app.use((req, res, next) => {
    const allowedPaths = ['/about.html', '/signup.html', '/login.html', '/', '/login'];

    // Si la ruta actual no está en allowedPaths y no hay sesión, redirige a /login.html
    if (!allowedPaths.includes(req.path) && req.session.idUsuario === undefined) {
        return res.redirect('/login.html'); // Use return to terminate further processing
    }

    next(); // Llamar next() solo si no redirigimos
});

app.use(express.static(buildPath));


// Ruta para servir inicio.html desde vite
app.get('/inicio.html', (req, res) => {
    res.sendFile(path.join(buildPath + '/inicio.html'));
});

// Ruta para servir upload.html desde vite
app.get('/upload.html', (req, res) => {
    res.sendFile(path.join(buildPath + '/upload.html'));
});

// Ruta para el perfil del usuario
app.get('/perfil.html', (req, res) => {
    res.sendFile(path.join(buildPath + '/perfil.html'));
});

// Ruta para los cursos que sigue el usuario
app.get('/misCursos.html', (req, res) => {
    res.sendFile(path.join(buildPath + '/misCursos.html'));
});

// Ruta para crear un nuevo curso
app.get('/nuevo.html', (req, res) => {
    res.sendFile(path.join(buildPath + '/nuevo.html'));
});

// Ruta para loguearse
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/vista/login.html'));
});

// Ruta para ir a crear usuario
app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/vista/signup.html'));
});

// Ruta para ir al about
app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/vista/about.html'));
});

// Ruta para manejar las solicitudes de inicio de sesión
app.post('/login', async (req, res) => {

    let correo = req.body.correo;
    let pass = req.body.contra;
    

    if (correo && pass) {

        var [results] = await pool.query('SELECT correo, contrasena, nombre, id, admin FROM usuarios WHERE correo = ? AND contrasena = ?', [correo, pass])

        if (results.length <= 0) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas. Intente de nuevo." });
        } else{
            req.session.nombreUsuario = results[0].nombre;
            req.session.idUsuario = results[0].id;
            req.session.admin = results[0].admin;

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
    
    if (correo && pass && usuario) {

        var [results] = await pool.query('INSERT INTO usuarios(correo, contrasena, nombre) VALUES(?,?,?) ', [correo, pass, usuario]);

        if (!results.affectedRows) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas. Intente de nuevo." });
        } else {
            return res.status(200).json({ success: true, message: "Cuenta creada con éxito." });
        }

    } else {
        return res.status(400).json({ success: false, message: "Por favor rellene bien los campos." });
    }

});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'No se pudo cerrar la sesión. Intente de nuevo.' });
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/'); 
    });
});

// Ruta para manejar las solicitudes de búsqueda
app.post('/search', async (req, res) => {
    const query = req.body.query;

    if (query) {
        var [results] = await pool.query('SELECT nombre, id FROM usuarios WHERE nombre LIKE ? AND id != ? ', [`%${query}%`, req.session.idUsuario]);
        return res.status(200).json({ results });
    } 
});

// Ruta para manejar las solicitudes de categorias
app.post('/categorias', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT id, nombre FROM categoria');

        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor." });
    }
});

// Ruta para manejar las solicitudes de cursos del usuario
app.post('/dropdownCursos', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT id, nombre FROM curso WHERE usuarios_id = ? ', [req.session.idUsuario]);

        return res.status(200).json({ results });
    } catch (error) {
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
    ' c.comentarista_id1 as comentarista_id1, c.aceptado as aceptado, u.nombre as nombre '+
    ' FROM comentario c JOIN usuarios u ON c.comentarista_id1 = u.id ' +
    ' WHERE usuarios_id = ? ', [req.session.idUsuario]);
    
    res.json(results);

});

// Ruta para aceptar un comentario
app.post('/api/comentarios/aceptar/:id', async (req, res) => {
    const comentarioId = req.params.id;

    try {
        // Primero, obtenemos el comentarista_id1 e idCurso del comentario aceptado
        const [commentResult] = await pool.query('SELECT comentarista_id1 FROM comentario WHERE id = ?', [comentarioId]);
        if (commentResult.length === 0) {
            return res.status(404).json({ success: false, message: "Comentario no encontrado." });
        }

        const comentaristaId1 = commentResult[0].comentarista_id1;

        // Actualizamos el comentario para marcarlo como aceptado
        const [results] = await pool.query('UPDATE comentario SET aceptado = "Y" WHERE id = ?', [comentarioId]);

        if (!results.affectedRows) {
            return res.status(401).json({ success: false, message: "No se encontró el comentario o ya está aceptado." });
        } else {
            // Insertamos una nueva entrada en la tabla de comentarios para cada curso del comentarista_id1
            const [cursos] = await pool.query('SELECT DISTINCT id FROM curso WHERE usuarios_id = ?', [comentaristaId1]);

            // Iteramos sobre cada curso e insertamos un nuevo comentario
            for (const curso of cursos) {
                const query = 'INSERT INTO comentario (idCurso, comentario, usuarios_id, comentarista_id1, aceptado) VALUES (?, ?, ?, ?, ?)';
                await pool.query(query, [curso.id, "Intercambio de conocimientos", comentaristaId1, req.session.idUsuario, 'Y']);
            }

            return res.status(200).json({ success: true, message: "Comentario aceptado exitosamente y cursos añadidos." });
        }
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        return res.status(500).json({ success: false, message: "Error en el servidor." });
    }
});
  
// Ruta para subir videos
app.post('/api/users/upload',upload.single('file'), async (req, res) => {
   
    var [result] = await pool.query('SELECT id FROM categoria WHERE nombre = ? ', [req.body.category]);
    var [result2] = await pool.query('SELECT id FROM curso WHERE nombre = ? AND usuarios_id = ?', [req.body.curso, req.session.idUsuario]);

    var [results] = await pool.query('INSERT INTO videos(enlace, categoria_id, usuarios_id, titulo, idCurso) VALUES(?,?,?,?,?) ', [req.file.filename, result[0].id, req.session.idUsuario, req.body.caption, result2[0].id]);

    if (!results.affectedRows) {
        return res.status(401).json({ success: false, message: "Ha habido un error. Intente de nuevo." });
    } else {
        return res.status(200).json({ success: true, message: "Video subido con éxito." });
    }

})

// Ruta para crear curso nuevo
app.post('/api/users/crearCurso', upload.none(), async (req, res) => {
   
    var [result] = await pool.query('SELECT id FROM categoria WHERE nombre = ? ', [req.body.category]);

    var [results] = await pool.query('INSERT INTO curso(nombre, categoria_id, usuarios_id) VALUES(?,?,?) ', [req.body.caption, result[0].id, req.session.idUsuario]);

    if (!results.affectedRows) {
        return res.status(401).json({ success: false, message: "Ha habido un error. Intente de nuevo." });
    } else {
        return res.status(200).json({ success: true, message: "Curso creado con éxito." });
    }

})

// Ruta para obtener todos los videos
app.get('/api/videos', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT id, enlace, titulo, idCurso, usuarios_id FROM videos WHERE usuarios_id != ?', [req.session.idUsuario]);
        return res.status(200).json({ videos: results });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor." });
    }
});

// Ruta para pedir un trueque
app.post('/api/comentarios', async (req, res) => {
    const { comentario, idCurso, video_id, usuarios_id } = req.body;
    const comentarista_id1 = req.session.idUsuario; 

    try {
        const [result] = await pool.query(
            'INSERT INTO comentario (idCurso, comentario, usuarios_id, comentarista_id1, aceptado) VALUES (?, ?, ?, ?, "")',
            [idCurso, comentario, usuarios_id, comentarista_id1]
        );
        return res.status(200).json({ success: true, message: "¡Trueque enviado!" });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor." });
    }
});

//Ruta para ver los videos desde el perfil
app.get('/api/videos/subidos', async (req, res) => {
    try {
        const userId = req.session.idUsuario;
        const query = `
            SELECT v.id, v.enlace, v.titulo, v.idCurso, c.nombre AS nombreCurso
            FROM videos v
            JOIN curso c ON v.idCurso = c.id
            WHERE v.usuarios_id = ?;
        `;
        const [results] = await pool.query(query, [userId]);
        return res.status(200).json({ videos: results });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor." });
    }
});

// Ruta para ver los videos seguidos
app.get('/api/cursoVideos/seguidos', async (req, res) => {
    try {
        const query = `
            SELECT DISTINCT v.id, v.enlace, v.titulo, v.idCurso, c.nombre AS nombreCurso
            FROM videos v
            JOIN curso c ON v.idCurso = c.id
            JOIN comentario com ON v.idCurso = com.idCurso
            WHERE com.aceptado = 'Y' AND com.comentarista_id1 = ?;
        `;
        const [results] = await pool.query(query, [req.session.idUsuario]);
        return res.status(200).json({ videos: results });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor." });
    }
});

// Ruta para obtener información del usuario por ID
app.get('/api/usuarios/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        var [user] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [userId]);
        if (user.length > 0) {
            res.status(200).json(user[0]);
        } else {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor." });
    }
});


// Ruta para obtener videos del usuario por ID
app.get('/api/videos/perfilUsuario/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const query = `
            SELECT v.id, v.enlace, v.titulo, v.idCurso, c.nombre AS nombreCurso
            FROM videos v
            JOIN curso c ON v.idCurso = c.id
            WHERE v.usuarios_id = ?;
        `;
        const [results] = await pool.query(query, [userId]);
        return res.status(200).json({ videos: results });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor." });
    }
});

// Ruta para eliminar videos
app.delete('/api/eliminarVideo', async (req, res) => {
    const { video_id, comentario, idCurso, usuarios_id } = req.body;
    const comentarista_id1 = req.session.idUsuario;

    try {
        // Obtener la información del video para eliminar el archivo
        const [videoResult] = await pool.query('SELECT enlace FROM videos WHERE id = ?', [video_id]);

        if (videoResult.length === 0) {
            return res.status(404).json({ success: false, message: "Video no encontrado." });
        }

        const videoPath = path.join(__dirname, 'uploads', videoResult[0].enlace);

        // Eliminar el registro del video en la base de datos
        const [deleteResult] = await pool.query('DELETE FROM videos WHERE id = ?', [video_id]);

        if (!deleteResult.affectedRows) {
            return res.status(401).json({ success: false, message: "No se encontró el video." });
        } else {
            // Eliminar el archivo del video del sistema de archivos
            fs.unlink(videoPath, async (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo:', err);
                    return res.status(500).json({ success: false, message: "Error al eliminar el archivo del video." });
                }

                // Insertar el comentario informando al usuario
                try {
                    const [commentResult] = await pool.query(
                        'INSERT INTO comentario (idCurso, comentario, usuarios_id, comentarista_id1, aceptado) VALUES (?, ?, ?, ?, "E")',
                        [idCurso, comentario, usuarios_id, comentarista_id1]
                    );
                    return res.status(200).json({ success: true, message: "Video eliminado exitosamente y comentario enviado." });
                } catch (commentError) {
                    console.error('Error al insertar el comentario:', commentError);
                    return res.status(500).json({ success: false, message: "Video eliminado, pero ocurrió un error al insertar el comentario." });
                }
            });
        }
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        return res.status(500).json({ success: false, message: "Error en el servidor." });
    }
});

// Eliminar video del usuario
app.delete('/api/eliminarVideo/todos/:id', async (req, res) => {
    const videoId = req.params.id;

    const videoPath = path.join(__dirname, 'uploads', videoId);

    // Eliminamos el archivo de video del sistema de archivos
    fs.unlink(videoPath, async (err) => {
        if (err) {
            console.error('Error al eliminar el archivo de video:', err);
            return res.status(500).json({ success: false, message: 'Error al eliminar el archivo de video' });
        }

        const [deleteResult] = await pool.query('DELETE FROM videos WHERE enlace = ?', [videoId]);

        if (!deleteResult.affectedRows) {
            return res.status(500).json({ success: false, message: 'Error al eliminar el video de la base de datos' });
        } else {
            return res.status(200).json({ success: true, message: 'Video eliminado correctamente' });
        }
    });
});

app.get('/api/user', (req, res) => {
    if (!req.session.admin) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    
    const userData = {
        id: req.session.idUsuario, 
        admin: req.session.admin 
    };

    return res.status(200).json(userData);
});

// Ruta para obtener videos del usuario por ID
app.get('/resultado/:id', async (req, res) => {
    const consulta = req.params.id;
    console.log(consulta)
    try {
        const query = `
            SELECT v.id, v.enlace, v.titulo, v.idCurso, c.nombre AS nombreCurso
            FROM videos v
            JOIN curso c ON v.idCurso = c.id
            WHERE v.usuarios_id = ?;
        `;
        const [results] = await pool.query(query, [userId]);
        return res.status(200).json({ videos: results });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
