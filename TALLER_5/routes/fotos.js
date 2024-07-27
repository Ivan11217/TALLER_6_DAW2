var express = require('express');
var router = express.Router();
const axios = require('axios');
const multer = require('multer');
const { Sequelize, Op } = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;

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

// Ruta para mostrar el formulario de agregar una nueva foto
router.get('/add', function(req, res, next) {
  res.render('fotos_formulario', { title: 'Add New Photo' });
});

// Ruta para manejar la solicitud POST para agregar una nueva foto
router.post('/add', upload.single('ruta'), async function(req, res, next) {
  let { titulo, descripcion, calificacion } = req.body;
  const data = {
    titulo: titulo,
    descripcion: descripcion,
    calificacion: parseFloat(calificacion),
    ruta: `/uploads/${req.file.filename}`
  };

  console.log('Datos enviados a /rest/fotos/save:', data);

  try {
    const response = await axios.post('http://localhost:4444/rest/fotos/save', data);
    if (response.status === 200) {
      res.redirect('/photos');  // Redirige a la lista de fotos después de agregar
    } else {
      res.status(400).send('Error al guardar la foto');
    }
  } catch (error) {
    console.error('Error al guardar la foto:', error.response ? error.response.data : error.message);
    res.status(400).send('Error al guardar la foto');
  }
});

// Ruta para mostrar todas las fotos en vista
router.get('/', async function(req, res, next) {
  try {
    const response = await axios.get('http://localhost:4444/rest/fotos/findAll/json');
    console.log('Fotos obtenidas:', response.data); // Verifica la respuesta del servidor
    res.render('fotos', { title: 'Photos', photos: response.data });
  } catch (error) {
    console.error('Error al obtener las fotos:', error.response ? error.response.data : error.message);
    res.status(400).send('Error al obtener las fotos');
  }
});

// Ruta para eliminar una foto
router.post('/delete/:id', async function(req, res, next) {
  try {
    const response = await axios.delete(`http://localhost:4444/rest/fotos/delete/${req.params.id}`);
    if (response.status === 200) {
      res.redirect('/photos');  // Redirige a la lista de fotos después de eliminar
    } else {
      res.status(400).send('Error al eliminar la foto');
    }
  } catch (error) {
    console.error('Error al eliminar la foto:', error.response ? error.response.data : error.message);
    res.status(400).send('Error al eliminar la foto');
  }
});

// Ruta para editar una foto (mostrar formulario)
router.get('/edit/:id', async function(req, res, next) {
  try {
    const response = await axios.get(`http://localhost:4444/rest/fotos/findById/${req.params.id}/json`);
    if (response.status === 200) {
      res.render('fotos_formulario_edit', { title: 'Edit Photo', foto: response.data[0] });
    } else {
      res.status(400).send('Error al obtener la foto para editar');
    }
  } catch (error) {
    console.error('Error al obtener la foto para editar:', error.response ? error.response.data : error.message);
    res.status(400).send('Error al obtener la foto para editar');
  }
});

// Ruta para actualizar una foto
router.post('/edit/:id', upload.single('ruta'), async function(req, res, next) {
  let { titulo, descripcion, calificacion } = req.body;
  const data = {
    titulo: titulo,
    descripcion: descripcion,
    calificacion: parseFloat(calificacion),
    ruta: `/uploads/${req.file ? req.file.filename : req.body.ruta}` // Mantén la ruta existente si no se sube un nuevo archivo
  };

  console.log('Datos enviados a /rest/fotos/update:', { id: req.params.id, ...data });

  try {
    const response = await axios.put(`http://localhost:4444/rest/fotos/update`, { id: req.params.id, ...data });
    if (response.status === 200) {
      res.redirect('/photos');  // Redirige a la lista de fotos después de actualizar
    } else {
      res.status(400).send('Error al actualizar la foto');
    }
  } catch (error) {
    console.error('Error al actualizar la foto:', error.response ? error.response.data : error.message);
    res.status(400).send('Error al actualizar la foto');
  }
});

// Ruta para obtener todas las fotos en formato JSON
router.get('/findAll/json', async function(req, res, next) {
  try {
    const fotos = await Foto.findAll({
      attributes: { exclude: ["updatedAt"] },
      include: [{
        model: Etiqueta,
        as: 'etiquetas',
        attributes: ['texto'],
        through: { attributes: [] }
      }]
    });
    res.json(fotos);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para obtener todas las fotos en formato vista
router.get('/findAll/view', async function(req, res, next) {
  try {
    const fotos = await Foto.findAll({
      attributes: { exclude: ["updatedAt"] },
      include: [{
        model: Etiqueta,
        as: 'etiquetas',
        attributes: ['texto'],
        through: { attributes: [] }
      }]
    });
    res.render('fotos', { title: 'Fotos', arrFotos: fotos });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para obtener fotos por calificación
router.get('/findAllByRate/json', function(req, res, next) {
  let lower = parseFloat(req.query.lower);
  let higher = parseFloat(req.query.higher);

  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [{
      model: Etiqueta,
      as: 'etiquetas',
      attributes: ['texto'],
      through: { attributes: [] }
    }],
    where: {
      calificacion: {
        [Op.between]: [lower, higher]
      }
    }
  })
  .then(fotos => {
    res.json(fotos);
  })
  .catch(error => {
    res.status(400).send(error);
  });
});

// Ruta para obtener fotos por ID
router.get('/findAllById/:id/json', function(req, res, next) {
  let id = parseInt(req.params.id);

  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [{
      model: Etiqueta,
      as: 'etiquetas',
      attributes: ['texto'],
      through: { attributes: [] }
    }],
    where: {
      [Op.and]: [
        { id: id }
      ]
    }
  })
  .then(fotos => {
    if (fotos.length > 0) {
      const fotosFormatted = fotos.map(foto => ({
        id: foto.id,
        titulo: foto.titulo,
        descripcion: foto.descripcion,
        calificacion: foto.calificacion,
        ruta: foto.ruta,
        createdAt: foto.createdAt,
        etiqueta: foto.etiquetas.map(etiqueta => ({ texto: etiqueta.texto }))
      }));
      res.json(fotosFormatted);
    } else {
      res.status(404).send({ message: "Foto no encontrada" });
    }
  })
  .catch(error => {
    res.status(400).send(error);
  });
});

// Ruta para obtener fotos por ID en vista
router.get('/findAllById/:id/view', function(req, res, next) {
  let id = parseInt(req.params.id);

  Foto.findOne({
    attributes: { exclude: ["updatedAt"] },
    include: [{
      model: Etiqueta,
      as: 'etiquetas',
      attributes: ['texto'],
      through: { attributes: [] }
    }],
    where: {
      id: id
    }
  })
  .then(foto => {
    if (foto) {
      const fotoFormatted = {
        id: foto.id,
        titulo: foto.titulo,
        descripcion: foto.descripcion,
        calificacion: foto.calificacion,
        ruta: foto.ruta,
        createdAt: foto.createdAt,
        etiqueta: foto.etiquetas.map(etiqueta => ({ texto: etiqueta.texto }))
      };
      res.render('fotoDetalle', { title: 'Detalle de Foto', foto: fotoFormatted });
    } else {
      res.status(404).send({ message: "Foto no encontrada" });
    }
  })
  .catch(error => {
    res.status(400).send(error);
  });
});

module.exports = router;
