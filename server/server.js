import express from 'express'
import path from 'path'
import {pool} from './db.js'
import { PORT } from './config.js'
import bodyParser from 'body-parser'


const app = express()
const __dirname = process.cwd()
app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname + '/vista/index.html'));
})

//app.use('/', express.static(path.join(__dirname + '/vista/index.html')))

app.use(express.static('./vista'))
app.use("/images", express.static("./images"));

const viewsPath = path.join(__dirname, '../vista');

app.use(express.static(viewsPath));

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));

// Ruta para manejar las solicitudes de inicio de sesión
app.post('/login', async (req, res) => {

    let correo = req.body.correo;
    let pass = req.body.contra;
    

    console.log({body:req.body})

    if (correo && pass) {

        var results = await pool.query('SELECT correo, contrasena FROM usuarios WHERE correo = ? AND contrasena = ?', [correo, pass])

        if (results.length == 0) {
            console.log("hay un error")
            res.status(401).send("Credenciales incorrectas. Intente de nuevo.");
        } else{
            console.log(results)
            res.redirect('./inicio.html');
        }

    } else {
        res.status(400).send("Por favor ingrese un correo y una contraseña.");
    }

});

