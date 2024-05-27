import express from 'express'
import session from 'express-session'
import path from 'path'
import {pool} from './db.js'
import { PORT } from './config.js'
import bodyParser from 'body-parser'
//import React from 'react';
//import ReactDOM from 'react-dom';


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
app.use("/vite", express.static('./vite'))
app.use("/images", express.static("./images"));
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



app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});



// Ruta para manejar las solicitudes de inicio de sesión
app.post('/login', async (req, res) => {

    let correo = req.body.correo;
    let pass = req.body.contra;
    

    console.log({body:req.body})

    if (correo && pass) {

        var [results] = await pool.query('SELECT correo, contrasena, nombre FROM usuarios WHERE correo = ? AND contrasena = ?', [correo, pass])

        if (results.length <= 0) {
            console.log("hay un error")
            return res.status(401).json({ success: false, message: "Credenciales incorrectas. Intente de nuevo." });
        } else{
            req.session.nombreUsuario = results[0].nombre;

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

// Ruta para el perfil del usuario
app.get('/perfil', (req, res) => {
    const nombreUsuario = req.session.nombreUsuario;
    res.render('perfil', { nombreUsuario });
});
