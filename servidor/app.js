
import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import bodyParser  from 'body-parser';

import multer from 'multer';
import Stripe from 'stripe';
const stripe = new Stripe(secret_key);

const upload = multer();

const app = express(); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(cors());


const port = 5000;
const url = mongoUrl; // Asegúrate de que esta URL sea correcta para tu instancia de MongoDB
const dbName = 'education'; // Reemplaza con el nombre de tu base de datos

// Middleware para parsear el cuerpo de las peticiones POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cliente de MongoDB
const client = new MongoClient(url);

// Conecta al cliente de MongoDB
async function conectarDB() {
  await client.connect();
  console.log('Conectado a MongoDB');
  const db = client.db(dbName);
  const collection = db.collection('contactos');

  // Ruta para recibir datos del formulario y guardarlos en la base de datos
  app.post('/enviar-formulario', upload.none(),async (req, res) => {
    console.log(req.body); 
    const { nombre, email, mensaje } = req.body;  
    try {
      await collection.insertOne({ nombre, email, mensaje });
      res.json({message:'En Breve nos pondremos en contacto con usted'});
    } catch (err) {
      console.error(err.message);
      res.json({message:'Error al guardar el contacto'});  
    }
  });

  // Ruta para obtener los contactos y enviarlos al frontend  
  app.get('/obtener-contactos', async (req, res) => {
    try {
      const contactos = await collection.find({}).toArray();
      res.json(contactos);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error al obtener los contactos');
    }
  });

  app.get('/curso-html', async (req, res) => {

    //res.sendFile(path.join(__dirname, '/public', 'cursos.html'));    
    res.sendFile(join(__dirname, 'public', 'cursos.html'));    
  })

  
// Ruta para manejar la compra de un curso
const product=[{
  name:'Curso de HTML',
  price:1000,
  id:1
}
]
app.post('/comprar-curso/:id', async (req, res) => {
  
  
    
});

  // Inicia el servidor
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}

conectarDB().catch(console.error);
