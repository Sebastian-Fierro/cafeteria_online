const express = require("express");
const router = express.Router();
const prisma = require("../prisma/client");

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  if (!products || products.length === 0) {
    return res.status(404).json({ error: "No products found" });
  }
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

router.post("/", async (req, res) => {
  const newProduct = await prisma.product.create({
    data: req.body,
  });
  res.status(201).json(newProduct);
});

module.exports = router;
