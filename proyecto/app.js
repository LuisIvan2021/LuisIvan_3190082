const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Middleware para manejar datos de formularios en las solicitudes POST
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración para usar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Servir archivos estáticos (como CSS o imágenes)
app.use(express.static('public'));

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Usuario de MySQL
    password: '', // Contraseña de MySQL
    database: 'node_crud', // Nombre de la base de datos
    port: 3306
});

// Comprobar conexión a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Iniciar el servidor en el puerto 3009
const port = 3009;
app.listen(port, () => {
    console.log(`Servidor en funcionamiento desde http://localhost:${port}`);
});

// Ruta principal: lista todos los usuarios de la tabla "users"
app.get('/', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.send('Error al obtener usuarios');
        } else {
            res.render('index', { users: results }); // Renderiza la vista index.ejs
        }
    });
});

// Ruta para mostrar el formulario de agregar usuario
app.get('/add', (req, res) => {
    res.render('add'); // Renderiza la vista add.ejs
});

// Ruta para procesar la solicitud de agregar un usuario
app.post('/add', (req, res) => {
    const { Nombre, correo, telefono, num_cuenta, sexo, edad, carrera } = req.body;
    const query = 'INSERT INTO users (Nombre, correo, telefono, num_cuenta, sexo, edad, carrera) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [Nombre, correo, telefono, num_cuenta, sexo, edad, carrera], (err) => {
        if (err) {
            console.error('Error al agregar usuario:', err);
            res.send('Error al agregar usuario');
        } else {
            res.redirect('/'); // Redirige a la lista principal después de agregar
        }
    });
});

// Ruta para mostrar el formulario de edición de un usuario específico
app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario:', err);
            res.send('Error al obtener usuario');
        } else {
            res.render('edit', { user: results[0] }); // Renderiza la vista edit.ejs
        }
    });
});

// Ruta para actualizar un usuario con los datos editados
app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { Nombre, correo, telefono, num_cuenta, sexo, edad, carrera } = req.body;
    const query = 'UPDATE users SET Nombre = ?, correo = ?, telefono = ?, num_cuenta = ?, sexo = ?, edad = ?, carrera = ? WHERE id = ?';
    db.query(query, [Nombre, correo, telefono, num_cuenta, sexo, edad, carrera, id], (err) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            res.send('Error al actualizar usuario');
        } else {
            res.redirect('/'); // Redirige a la lista principal después de actualizar
        }
    });
});

// Ruta para eliminar un usuario
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            res.send('Error al eliminar usuario');
        } else {
            res.redirect('/'); // Redirige a la lista principal después de eliminar
        }
    });
});