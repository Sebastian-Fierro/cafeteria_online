const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

router.get('/', async (req, res) => {
    const products = await prisma.product.findMany();
    if (products.length === 0) {
        return res.status(404).json({ error: 'No products found' });
    }
    res.json(products);
});

router.get('/:id', async (req, res) => {
    const product = await prisma.product.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

router.post('/', async (req, res) => {
    console.log("Datos recibidos: ",req.body);
    const newProduct = await prisma.product.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            price: parseInt(req.body.price),
            stock: parseInt(req.body.stock),
            categoryId: req.body.categoryId ? parseInt(req.body.categoryId) : null,
            image: req.body.image,
            isActive: req.body.isActive
        }
    });
    res.status(201).json(newProduct);
});

router.delete('/:id', async (req, res) => {
    const deletedProduct = await prisma.product.delete({
    where: { id: parseInt(req.params.id) },
  });
  if (!deletedProduct) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json({ message: "Product deleted successfully" });
});

router.put('/:id', async (req, res) => {
    const updatedProduct = await prisma.product.update({
    where: { id: parseInt(req.params.id) },
      data: {
        name: req.body.name,
        description: req.body.description,
        price: parseInt(req.body.price), 
        stock: parseInt(req.body.stock), 
        categoryId: parseInt(req.body.categoryId), 
        image: req.body.image,
        isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      },
  });
  if (!updatedProduct) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(updatedProduct);
});

module.exports = router;