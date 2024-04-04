
import express from 'express';
import { MongoClient } from 'mongodb';

import cors from 'cors';
import bodyParser  from 'body-parser';

import multer from 'multer';
const upload = multer();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());


const port = 3000;
const url = 'mongodb+srv://dperco4:Qadf0502@dperco.2zavjrc.mongodb.net/?retryWrites=true&w=majority&appName=dperco'; // Asegúrate de que esta URL sea correcta para tu instancia de MongoDB
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

  // Inicia el servidor
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}

conectarDB().catch(console.error);