const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Poblando base de datos con seed prisma...");

  // Usuarios
  let admin = await prisma.user.findUnique({
    where: { email: "admin@cafeteria.com" },
  });
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: "admin@cafeteria.com",
        password: "admin1234",
        name: "Admin Cafetería",
        role: "ADMIN",
      },
    });
  }

  let client = await prisma.user.findUnique({
    where: { email: "cliente@cafeteria.com" },
  });
  if (!client) {
    client = await prisma.user.create({
      data: {
        email: "cliente@cafeteria.com",
        password: "cliente1234",
        name: "Cliente Cafetería",
        role: "CLIENT",
      },
    });
  }

  // Categorías (busca o crea)
  async function findOrCreateCategory(name) {
    let category = await prisma.category.findUnique({ where: { name } });
    if (!category) {
      category = await prisma.category.create({ data: { name } });
    }
    return category;
  }

  const cafe = await findOrCreateCategory("Cafés");
  const te = await findOrCreateCategory("Tés");
  const pasteleria = await findOrCreateCategory("Pastelería");
  const donutCat = await findOrCreateCategory("Donut");

  // Función para insertar productos si no existen
  async function findOrCreateProduct(product) {
    let prod = await prisma.product.findFirst({
      where: {
        name: product.name,
        categoryId: product.categoryId,
      },
    });
    if (!prod) {
      prod = await prisma.product.create({ data: product });
    }
    return prod;
  }

  // Productos
  const cafeProducts = [
    {
      name: "Espresso",
      description: "Café espresso intenso",
      price: 2.5,
      stock: 100,
      image: "espresso.jpg",
      categoryId: cafe.id,
    },
    {
      name: "Latte",
      description: "Café con leche suave",
      price: 3.0,
      stock: 80,
      image: "latte.jpg",
      categoryId: cafe.id,
    },
    {
      name: "Americano",
      description: "Café americano clásico",
      price: 2.2,
      stock: 90,
      image: "americano.jpg",
      categoryId: cafe.id,
    },
    {
      name: "Mocaccino",
      description: "Café con chocolate",
      price: 3.5,
      stock: 50,
      image: "mocaccino.jpg",
      categoryId: cafe.id,
    },
    {
      name: "Capuccino",
      description: "Café con espuma cremosa",
      price: 3.2,
      stock: 60,
      image: "capuccino.jpg",
      categoryId: cafe.id,
    },
  ];

  const teProducts = [
    {
      name: "Té Verde",
      description: "Té verde natural",
      price: 2.0,
      stock: 70,
      image: "te_verde.jpg",
      categoryId: te.id,
    },
    {
      name: "Té Negro",
      description: "Té negro intenso",
      price: 2.0,
      stock: 60,
      image: "te_negro.jpg",
      categoryId: te.id,
    },
    {
      name: "Té Chai",
      description: "Té especiado",
      price: 2.5,
      stock: 40,
      image: "te_chai.jpg",
      categoryId: te.id,
    },
    {
      name: "Té Frutal",
      description: "Infusión de frutas",
      price: 2.3,
      stock: 30,
      image: "te_frutal.jpg",
      categoryId: te.id,
    },
    {
      name: "Té Hierbas",
      description: "Té de hierbas relajante",
      price: 2.2,
      stock: 50,
      image: "te_hierbas.jpg",
      categoryId: te.id,
    },
  ];

  const pasteleriaProducts = [
    {
      name: "Croissant",
      description: "Hojaldre crujiente",
      price: 1.8,
      stock: 40,
      image: "croissant.jpg",
      categoryId: pasteleria.id,
    },
    {
      name: "Muffin Chocolate",
      description: "Muffin esponjoso",
      price: 2.2,
      stock: 30,
      image: "muffin.jpg",
      categoryId: pasteleria.id,
    },
    {
      name: "Cheesecake",
      description: "Pastel de queso",
      price: 3.0,
      stock: 20,
      image: "cheesecake.jpg",
      categoryId: pasteleria.id,
    },
    {
      name: "Brownie",
      description: "Brownie de chocolate",
      price: 2.5,
      stock: 25,
      image: "brownie.jpg",
      categoryId: pasteleria.id,
    },
    {
      name: "Pan de Queso",
      description: "Delicioso pan de queso",
      price: 1.5,
      stock: 35,
      image: "pan_de_queso.jpg",
      categoryId: pasteleria.id,
    },
  ];

  const donutProducts = [
    {
      name: "Donut Glaseado",
      description: "Donut dulce clásico",
      price: 1.5,
      stock: 50,
      image: "donut_glaseado.jpg",
      categoryId: donutCat.id,
    },
    {
      name: "Donut Chocolate",
      description: "Donut con cobertura de chocolate",
      price: 1.8,
      stock: 40,
      image: "donut_chocolate.jpg",
      categoryId: donutCat.id,
    },
    {
      name: "Donut Vainilla",
      description: "Donut con glaseado de vainilla",
      price: 1.7,
      stock: 30,
      image: "donut_vainilla.jpg",
      categoryId: donutCat.id,
    },
    {
      name: "Donut Relleno",
      description: "Donut relleno de crema",
      price: 2.0,
      stock: 20,
      image: "donut_relleno.jpg",
      categoryId: donutCat.id,
    },
    {
      name: "Donut Sprinkles",
      description: "Donut con chispas de colores",
      price: 1.9,
      stock: 25,
      image: "donut_sprinkles.jpg",
      categoryId: donutCat.id,
    },
  ];

  for (const product of [...cafeProducts, ...teProducts, ...pasteleriaProducts, ...donutProducts]) {
    await findOrCreateProduct(product);
  }

  // Recupera algunos productos para la orden
  const productos = await prisma.product.findMany({
    where: {
      name: {
        in: ["Espresso", "Té Verde", "Croissant"],
      },
    },
  });

  // Comprueba si ya existe una orden para el cliente y esos productos
  const existingOrder = await prisma.order.findFirst({
    where: {
      clientId: client.id,
      status: "PENDING",
      items: {
        some: {
          productId: {
            in: productos.map((p) => p.id),
          },
        },
      },
    },
  });

  if (!existingOrder) {
    await prisma.order.create({
      data: {
        clientId: client.id,
        total: productos.reduce((acc, p) => acc + p.price, 0),
        status: "PENDING",
        paymentMethod: "CREDIT_CARD",
        items: {
          create: productos.map((product) => ({
            productId: product.id,
            quantity: 1,
            price: product.price,
          })),
        },
      },
    });
  }

  console.log("✅ Poblacion completada correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });