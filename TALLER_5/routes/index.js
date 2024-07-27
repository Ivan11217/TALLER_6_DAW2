const express = require('express');
const router = express.Router();
const axios = require('axios'); // Asegúrate de tener axios instalado
const multer = require('multer');

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// GET lista de fotos
router.get('/photos', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4444/rest/fotos/findAll/json');
    res.render('fotos', { title: 'Photos', photos: response.data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET formulario de agregar foto
router.get('/photos/add', (req, res) => {
  res.render('fotos_formulario', { title: 'Add New Photo' });
});

// POST guardar nueva foto
router.post('/photos/save', upload.single('route'), async (req, res) => {
  let { title, description, rate } = req.body;
  const URL = 'http://localhost:4444/rest/fotos/save';
  let data = {
    titulo: title,
    descripcion: description,
    calificacion: rate,
    ruta: `/uploads/${req.file.filename}`
  };

  try {
    const response = await axios.post(URL, data);
    if (response.status === 200 && response.statusText === 'OK') {
      res.redirect('/photos');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error al guardar la foto:', error);
    res.redirect('/');
  }
});

module.exports = router;
