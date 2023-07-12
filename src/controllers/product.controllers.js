import ProductManagerMongo from "../Dao/managers/mongo/productManagerMongo.js";
import { EError } from "../enums/EError.js";
import { generateErrorParam } from "../services/errorParam.js";
import { generateProductErrorInfo } from "../services/errorInfo.js";
import CustomError from "../services/customError.service.js";
const productManagerMongo = new ProductManagerMongo();

const customError = new CustomError();
export default class ProductController{
    async getProducts (req, res){
        try {
            const products = await productManagerMongo.getProducts();
            res.status(200).send({ products });
        } catch (error) {
            res.status(500).send({ error: 'Error interno del servidor' });
        };
    };
    async getProductById (req, res){
        try {
            const idProduct = req.params.pid;
            const productID = parseInt(idProduct);
            if(Number.isNaN(productID)){
                customError.createError({
                    name: "Product get by id error",
                    cause:generateErrorParam(productID),
                    message:"Error obteniendo el uproducto por el id",
                    errorCode: EError.INVALID_PARAM
                });
            };
            const product = await productManagerMongo.getProductById(idProduct);
            res.status(200).send({ product });
        } catch (error) {
            res.status(500).send({ error: 'Error interno del servidor' });
        };
    };
    async addProduct (req,res){
        try {
            const { title, description, price, category, thumbnail, code, stock} = req.body;
            if (!title || !description || !price || !category || !thumbnail || !code || !stock) {
                customError.createError({
                    name: "Product create error",
                    cause: generateProductErrorInfo(req.body),
                    message: "Error creando el producto.",
                    errorCode: EError.INVALID_JSON
                });
            };
            const productData = {
                title,
                description,
                price,
                category,
                thumbnail,
                code,
                stock
            };
            await productManagerMongo.addProduct(productData);
            res.status(200).send({ msg: 'Producto creado exitosamente' });
        } catch (error) {
            res.status(500).send({ error: 'Error interno del servidor' });
        };
    };
    async deleteProductById (req, res){
        try {
            const idProduct = req.params.pid;
            customError.createError({
                name: "Product get by id error",
                cause:generateErrorParam(productID),
                message:"Error obteniendo el uproducto por el id",
                errorCode: EError.INVALID_PARAM
            });
            await productManagerMongo.deleteProductById(idProduct);
            res.status(200).send({ msg: 'Producto eliminado exitosamente' });
        } catch (error) {
            res.status(500).send({ error: 'Error interno del servidor' });
        };
    };
    async updateProductById (req, res){
        try {
            const idProduct = req.params.pid;
            const { title, description, price, category, thumbnail, code, stock} = req.body;
            customError.createError({
                name: "Product get by id error",
                cause:generateErrorParam(productID),
                message:"Error obteniendo el uproducto por el id",
                errorCode: EError.INVALID_PARAM
            });
            if (!title || !description || !price || !category || !thumbnail || !code || !stock) {
                customError.createError({
                    name: "Product create error",
                    cause: generateProductErrorInfo(req.body),
                    message: "Error creando el producto.",
                    errorCode: EError.INVALID_JSON
                });
            };
            const updateData = {
                title,
                description,
                price,
                category,
                thumbnail,
                code,
                stock
            };
            await productManagerMongo.updateProductById(idProduct, updateData);
            res.status(200).send({ msg: 'Producto actualizado exitosamente' });
            } catch (error) {
                res.status(500).send({ error: 'Error interno del servidor' });
            };
    };
};