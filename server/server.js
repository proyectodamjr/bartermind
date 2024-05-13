import express from 'express'
import path from 'path'
import {pool} from './db.js'
import { PORT } from './config.js'


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
/*
// Ruta para manejar las solicitudes de inicio de sesión
app.post('/login', async (req, res) => {

    const correo = req.body.correo;
    const pass = req.body.contra;

    if (correo && pass) {

        connection.query('SELECT correo, contrasena FROM usuarios WHERE correo = ? AND contrasena = ?', [correo], [pass], async (err, results) => {

            if (results.length == 0) {
                res.render('login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Correo y/o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            } else{
                req.session.name = results[0].name;
                res.render('login',{
                    alert: true,
                    alertTitle: "Conección exitosa",
                    alertMessage: "Login correcto!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'inicio'
                });
            }

        });

    } else {
        res.send("Ingrese un correo y una contraseña");
    }

});

*/