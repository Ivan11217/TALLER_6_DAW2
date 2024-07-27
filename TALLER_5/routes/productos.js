const express = require('express');
const router = express.Router();
const { Producto } = require('../models');

router.get('/', async (req, res) => {
  const productos = await Producto.findAll();
  res.render('productos', { productos });
});

router.post('/create', async (req, res) => {
  const { descrip, stock, precio } = req.body;
  await Producto.create({ descrip, stock, precio });
  res.redirect('/productos');
});

module.exports = router;
