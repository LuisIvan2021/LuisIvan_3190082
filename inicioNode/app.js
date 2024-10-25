const express = require("express");
const path = require("path");
const port = 3009;
const app = express();

// Ruta raíz que redirige a /formulario por defecto
app.get("/", (req, res) => {
    res.redirect("/formulario");
});

// Ruta para el formulario
app.get("/formulario", (req, res) => {
    res.sendFile(path.join(__dirname, "formulario.html"));
});

// Ruta para la página de información
app.get("/informacion", (req, res) => {
    res.sendFile(path.join(__dirname, "informacion.html"));
});

// Ruta para la página de inicio
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Inicialización del servidor
app.listen(port, () => {
    console.log(`El servidor está disponible por medio de: http://localhost:${port}`);
});