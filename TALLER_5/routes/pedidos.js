const express = require('express');
const router = express.Router();
const { Pedido, Cliente, Producto, ProdxPedido } = require('../models');

router.get('/', async (req, res) => {
  const pedidos = await Pedido.findAll({ include: [Cliente, Producto] });
  res.render('pedidos', { pedidos });
});

router.post('/create', async (req, res) => {
  const { fecha, idcliente, estado, productos } = req.body;
  const pedido = await Pedido.create({ fecha, idcliente, estado });
  productos.forEach(async prod => {
    await ProdxPedido.create({
      idprod: prod.idprod,
      idpedido: pedido.id,
      cantidad: prod.cantidad,
      precio: prod.precio
    });
  });
  res.redirect('/pedidos');
});

module.exports = router;
