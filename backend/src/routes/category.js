const express = require("express");
const router = express.Router();
const prisma = require("../prisma/client");

router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  const category = await prisma.category.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json(category);
});

router.post("/", async (req, res) => {
  const newCategory = await prisma.category.create({
    data: req.body,
  });
  res.status(201).json(newCategory);
});

module.exports = router;
