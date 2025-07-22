const express = require("express");
const router = express.Router();
const prisma = require("../prisma/client");

router.get("/", async (req, res) => {
  const orders = await prisma.order.findMany({
    include: { 
      items: { 
        select: { 
          product: { 
            select: { id: true, name: true, price: true } 
          }, 
          quantity: true, 
          price: true 
        } 
      },
      client: { 
        select: { id: true, name: true } 
      }
    }
  });
  res.json(orders);
});

router.get("/:id", async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { 
      items: { select: { productId: true, quantity: true, price: true } },
      client: { select: { id: true, name: true } }
    }
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

router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  const validStatuses = [
    "PENDING",
    "IN_PREPARATION",
    "READY_FOR_PICKUP",
    "COMPLETED",
    "CANCELLED",
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Estado inválido" });
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: { status },
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Error updating order status" });
  }
});


module.exports = router;
