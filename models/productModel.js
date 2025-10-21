let products = [
  { id: 1, name: 'Phone', price: 500 },
  { id: 2, name: 'Laptop', price: 1200 }
];

module.exports = {
  getAll: () => products,
  getById: (id) => products.find(p => p.id === Number(id)),
  create: (product) => {
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id, ...product };
    products.push(newProduct);
    return newProduct;
  },
  update: (id, updates) => {
    const index = products.findIndex(p => p.id === Number(id));
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates };
    return products[index];
  },
  delete: (id) => {
    const before = products.length;
    products = products.filter(p => p.id !== Number(id));
    return products.length < before;
  }
};
