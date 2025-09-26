const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

router.get('/', async (req, res) => {
    const categories = await prisma.category.findMany();
    if (categories.length === 0) {
        return res.status(404).json({ error: 'No categories found' });
    }
    res.json(categories);
});

router.get('/:id', async (req, res) => {
    const category = await prisma.category.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json(category);
});

router.post('/', async (req, res) => {
    console.log("Datos recibidos: ",req.body);
    const newCategory = await prisma.category.create({
        data: {
            name: req.body.name,
            description: req.body.description
        }
    });
    console.log("Nueva categoría creada exitosamente");
    res.status(201).json(newCategory);
});

router.delete('/:id', async (req, res) => {
    const deletedCategory = await prisma.category.delete({
    where: { id: parseInt(req.params.id) },
  });
  if (!deletedCategory) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json({ message: "Category deleted successfully" });
});

router.put('/:id', async (req, res) => {
    const updatedCategory = await prisma.category.update({
    where: { id: parseInt(req.params.id) },
    data: {
        name: req.body.name,
        description: req.body.description
    }
  });
  if (!updatedCategory) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json(updatedCategory);
});

module.exports = router;