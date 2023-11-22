const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

app.use(cors());

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Define Product model
class Product extends Model { }
Product.init({
    id: DataTypes.NUMBER,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
}, { sequelize, modelName: 'product' });

// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CRUD routes for products model
app.get('/api/products', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

app.post('/api/products', async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
});

app.delete('/api/products/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
        await product.destroy();
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});