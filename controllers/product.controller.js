const productService = require("../services/product.service");

const createProduct = async(req, res) => {
    try {
        const { body, file } = req;
        if (file) {
            body.imageUrl = file.path;
        }
        const product = await productService.createProduct(req.body);

        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const deleteProduct = async(req, res) => {
    const productId = req.params.id;

    try {
        const product = await productService.deleteProduct(productId);

        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const updateProduct = async(req, res) => {
    const productId = req.params.id;
    const { body, file } = req;
    if (file) {
        body.imageUrl = file.path;
    }
    try {
        const product = await productService.updateProduct(productId, req.body);

        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const findProductById = async(req, res) => {
    const productId = req.params.id;

    try {
        const product = await productService.findProductById(productId);

        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const getAllProducts = async(req, res) => {
    try {
        const products = await productService.getAllProducts();

        return res.status(201).send(products);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts
}