const express = require("express");
const router = express.Router();
const prisma = require("../prisma/client");

router.get("/", async (req, res) => {
  const orders = await prisma.order.findMany({
    include: { items: true, client: true },
  });
  res.json(orders);
});

router.get("/:id", async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { items: true, client: true },
  });
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(order);
});

router.post("/", async (req, res) => {
  const { clientId, items, total, status, paymentMethod } = req.body;
  const newOrder = await prisma.order.create({
    data: {
      clientId,
      total,
      status,
      paymentMethod,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  res.status(201).json(newOrder);
});

router.put('/:id/status', async (req, res) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: 'Error updating order status' });
  }
});

module.exports = router;
