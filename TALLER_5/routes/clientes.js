const express = require('express');
const router = express.Router();
const { Sequelize, Op } = require('sequelize');
const { Cliente, Servicio } = require('../models');

// Ruta para listar todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.render('clientes', { title: 'Listar Todos los Clientes', clientes });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para mostrar el formulario de creación de un nuevo cliente
router.get('/create', (req, res) => {
  res.render('crearCliente', { title: 'Crear Cliente' });
});

// Ruta para crear un nuevo cliente
router.post('/create', async (req, res) => {
  const { nombre, apellido, cedula } = req.body;
  await Cliente.create({ nombre, apellido, cedula });
  res.redirect('/clientes');
});

// Ruta para filtrar clientes
router.get('/filter', async (req, res) => {
  const { nombre, apellido, cedula } = req.query;

  try {
    const clientes = await Cliente.findAll({
      where: {
        [Op.and]: [
          nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null,
          apellido ? { apellido: { [Op.like]: `%${apellido}%` } } : null,
          cedula ? { cedula: { [Op.like]: `%${cedula}%` } } : null,
        ].filter(Boolean)
      }
    });

    if (clientes.length === 1) {
      const cliente = clientes[0];
      const detallesCliente = await Cliente.findByPk(cliente.id, {
        include: [{
          model: Servicio,
          as: 'servicios',
          attributes: ['descripcion', 'precio'],
          through: { attributes: [] }
        }]
      });
      res.render('detalleCliente', { title: 'Detalle del Cliente', cliente: detallesCliente });
    } else {
      res.render('clientes', { title: 'Listar Clientes Filtrados', clientes });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
