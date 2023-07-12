import productModel from "../../models/products.model.js"

export default class ProductManagerMongo {
    async addProduct(productData) {
        const { title, description, price, category, thumbnail, code, stock } = productData;
        if (!title || !description || !price || !category || !thumbnail || !code || !stock) {
            throw new Error("Faltan datos");
        };
        const product = { title, description, price, category, thumbnail, code, stock };
        const result = await productModel.create(product);
        return result;
    };
    async getProducts(){
        const products = await productModel.find();
        return products;
    };
    async getProductById(idProduct) {
        const product = await productModel.find({ _id: idProduct });
        return product;
    };
    async deleteProductById(idProduct) {
        await productModel.deleteOne({ _id: idProduct });
        return this.getProducts();
    };
    async updateProductById(idProduct, updateData){
        const { title, description, price, category, thumbnail, code, stock } = updateData;
        if (!title || !description || !price || !category || !thumbnail || !code || !stock) {
            throw new Error("Faltan datos");
        };
        const product = await productModel.updateOne({ _id: idProduct }, { $set: updateData });
        await product.save();
    };
    async productsFindLean(){
        const products = await productModel.find().lean();
        return products;
    };
};