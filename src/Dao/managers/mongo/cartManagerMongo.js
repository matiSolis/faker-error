import cartModel from "../../models/cart.model.js";
import productModel from "../../models/products.model.js";

export default class CartManagerMongo {
    async createNewCart() {
        const cart = await cartModel.create({ products: [] });
        return cart;
    };
    async getDetailsInCart (idCart) {
        const cart = await cartModel.findById(idCart).populate('products.product');
        return cart;
    };
    async getAllCarts() {
        const cart = await cartModel.find();
        return cart;
    };
    async getCartById (idCart) {
        const cart = await cartModel.findOne({_id: idCart});
        return cart;
    };
    async addProductInCart (idCart, idProduct) {
        const findProduct = await productModel.findOne({_id: idProduct});
        const alreadyInCart = await cartModel.findOne({products: {$elemMatch: {product: findProduct._id}}});
        if (!alreadyInCart) {
            await cartModel.updateOne({_id: idCart}, {$push: {products: {product: findProduct._id, quantity: 1}}});
        } else {
            alreadyInCart.products.find(p => p.product.equals(findProduct._id)).quantity += 1;
            await alreadyInCart.save();
        };
    };
    async clearCart (idCart){
        const cart = await cartModel.findById(idCart);
        cart.products = [];
        await cart.save();
        return cart;
    };
    async updateProductQuantity (cartId, productId, quantity) {
        const cart = await cartModel.findById(cartId);
        const productIndex = cart.products.findIndex(
            (product) => product.product.toString() === productId
        );
        if (productIndex !== -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
        } else {
            throw new Error("El producto no se encontró en el carrito");
        };
    };
    async addProductsToCart (idCart, products) {
        const cart = await cartModel.findById(idCart);
        for (const product of products) {
            const alreadyInCart = cart.products.find(item => item.product.toString() === product.product);
            if (alreadyInCart) {
                alreadyInCart.quantity = product.quantity;
            } else {
                cart.products.push({
                    product: product.product,
                    quantity: product.quantity,
                });
            };
        };
        await cart.save();
    };
    async deleteCart (idCart) {
        const cart = await cartModel.findById(idCart);
        if (!cart) {
            throw new Error('El carrito no existe');
        };
        await cartModel.findByIdAndDelete(idCart);
        await cart.save();
    };
    async deleteProductInCart (idCart, idProduct) {
        const cart = await cartModel.findById(idCart);
        const productIndex = cart.products.findIndex((product) => product.product.toString() === idProduct);
        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
        } else {
            throw new Error('El producto no se encontró en el carrito.');
        };
    };
};