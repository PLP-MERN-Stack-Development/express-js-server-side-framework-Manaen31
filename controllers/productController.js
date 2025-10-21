// controllers/productController.js
let products = [
  { id: 1, name: 'Phone', price: 500 },
  { id: 2, name: 'Laptop', price: 1200 }
];

exports.getProducts = (req, res) => {
  let result = products;

  // Filtering by minPrice and maxPrice
  const { search, minPrice, maxPrice, page = 1, limit = 5 } = req.query;

  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (minPrice) {
    result = result.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    result = result.filter(p => p.price <= parseFloat(maxPrice));
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = result.slice(start, end);

  res.json({
    total: result.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginated,
  });
};


exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const { name, price } = req.body;
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (name) product.name = name;
  if (price) product.price = price;

  res.json(product);
};

exports.deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ message: 'Product deleted' });
};

// Export products array in case routes need it
exports.products = products;
