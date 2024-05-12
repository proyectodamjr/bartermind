import express from 'express'
import pool from './db,js'

const app = express()

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/vista/index.html'));
})



/*
//const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

//const app = express();
const port = 3000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//const dotenv = require("dotenv");
//dotenv.config({path:"./env/.env"});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'tfgbbdd',
    port: 3306
});

connection.connect((error)=>{
    if(error){
        console.log("error de conección");
        return;
    }
    console.log("conectado a la base de datos");

})


//app.get("/", (req,res)=>{
//    res.render("index");
//});

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