import CartManagerMongo from "../Dao/managers/mongo/cartManagerMongo.js";
import TicketManagerMongo from "../Dao/managers/mongo/ticketManagerMongo.js";
import { EError } from "../enums/EError.js";
import { generateErrorParam } from "../services/errorParam.js";
import { generateQuantityErrorInfo } from "../services/errorInfo.js";
import CustomError from "../services/customError.service.js";

const cartManagerMongo = new CartManagerMongo();
const ticketManagerMongo = new TicketManagerMongo();
const customError = new CustomError();

export default class CartController{
    async getAllCarts (req, res) {
        try {
            const result = await cartManagerMongo.getAllCarts();
            res.status(200).send({
                status: "success",
                result
            });
        }catch(error){
            res.status(400).send({
                status: "Error",
                msg: `El total de carritos no se puede visualizar.`
            });
        };
    };
    async getCartById (req, res) {
        try{
            const idCart = req.params.cid;
            const result = await cartManagerMongo.getCartById(idCart);
            if(!result){
                customError.createError({
                    name: "Cart get by id error",
                    cause:generateErrorParam(idCart),
                    message:"Error obteniendo el carrito por el id.",
                    errorCode: EError.INVALID_PARAM
                });
            };
            //si lo hago asi por la negativa del result
            //o si lo pongo antes de la funcion, no genera el error.
            return res.status(200).send({
                status: "success",
                result
            });
        }catch (error) {
            res.status(400).send({
                status: "Error",
                msg: `El carrito solicitado no se puede visualizar.`
                //muestra este error, y no el que genero yo.
            });
        };
    };
    async getDetailsInCart (req, res) {
        try {
            const idCart = req.params.cid;
            const cartID = parseInt(idCart);
            if(Number.isNaN(cartID)){
                CustomError.createError({
                    name: "Cart get by id error",
                    cause:generateErrorParam(cartID),
                    message:"Error obteniendo el carrito por el id.",
                    errorCode: EError.INVALID_PARAM
                });
            };
            const result = await cartManagerMongo.getDetailsInCart(idCart);
            return res.status(200).send({
                status: "success",
                result
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Error al obtener los detalles del carrito.' });
        };
    };
    async createNewCart (req, res) {
        try{
            const result = await cartManagerMongo.createNewCart();
            res.status(200).send({
                status: "success",
                result
            });
        }catch (error) {
            res.status(400).send({
                status: "Error",
                msg: `El carrito solicitado no se puede crear.`
            });
        };
    };
    async addProductInCart (req, res) {
        try {
            const idCart = req.params.cid;
            const idProduct = req.params.pid;
            const cartID = parseInt(idCart);
            if(Number.isNaN(cartID)){
                CustomError.createError({
                    name: "Cart get by id error",
                    cause:generateErrorParam(cartID),
                    message:"Error obteniendo el carrito por el id.",
                    errorCode: EError.INVALID_PARAM
                });
            };
            const productID = parseInt(idProduct);
            if(Number.isNaN(productID)){
                CustomError.createError({
                    name: "Product get by id error",
                    cause:generateErrorParam(productID),
                    message:"Error obteniendo el uproducto por el id",
                    errorCode: EError.INVALID_PARAM
                });
            };
            const result = await cartManagerMongo.addProductInCart(idCart, idProduct);
            return res.status(200).send({
                status: "success",
                result
            });
        } catch (error) {
            res.status(400).send({
                status: "Error",
                msg: `El producto solicitado no se puede agregar en el carrito indicado.`
            });
        };
    };
    async clearCart (req, res) {
        try {
            const idCart = req.params.cid;
            const cartID = parseInt(idCart);
            if(Number.isNaN(cartID)){
                CustomError.createError({
                    name: "Cart get by id error",
                    cause:generateErrorParam(cartID),
                    message:"Error obteniendo el carrito por el id.",
                    errorCode: EError.INVALID_PARAM
                });
            };
            const result = await cartManagerMongo.clearCart(idCart);
            res.status(200).send({
                status: "Success",
                result
            });
        } catch (error) {
            res.status(400).send({
                status: "Error",
                msg: "No se puede vaciar el carrito."
            });
        };
    };
    async updateProductQuantity (req, res) {
        try {
            const idCart = req.params.cid;
            const idProduct = req.params.pid;
            const quantity = req.body.quantity;
            const cartID = parseInt(idCart);
            if(Number.isNaN(cartID)){
                CustomError.createError({
                    name: "Cart get by id error",
                    cause:generateErrorParam(cartID),
                    message:"Error obteniendo el carrito por el id.",
                    errorCode: EError.INVALID_PARAM
                });
            };
            const productID = parseInt(idProduct);
            if(Number.isNaN(productID)){
                CustomError.createError({
                    name: "Product get by id error",
                    cause:generateErrorParam(productID),
                    message:"Error obteniendo el uproducto por el id",
                    errorCode: EError.INVALID_PARAM
                });
            };
            const quantityNumb = parseInt(quantity);
            if(Number.isNaN(quantityNumb)){
                CustomError.createError({
                    name: "Qantity error",
                    cause:generateQuantityErrorInfo(quantityNumb),
                    message:"Error obteniendo la cantidad solicitada.",
                    errorCode: EError.INVALID_JSON
                });
            };
            const result = await cartManagerMongo.updateProductQuantity(idCart, idProduct, quantity);
            res.status(200).send({
                status: "success",
                result
            });
        } catch (error) {
            res.status(400).send({
                status: "Error",
                msg: "No se puede actualizar la cantidad del producto en el carrito."
            });
        };
    };
    async addProductsToCart (req, res) {
        try {
            const idCart = req.params.cid;
            const products = req.body;
            const cartID = parseInt(idCart);
            if(Number.isNaN(cartID)){
                CustomError.createError({
                    name: "Cart get by id error",
                    cause:generateErrorParam(cartID),
                    message:"Error obteniendo el carrito por el id.",
                    errorCode: EError.INVALID_PARAM
                });
            };
            const result = await cartManagerMongo.addProductsToCart(idCart, products);
            res.status(200).send({
                status: 'success',
                result,
            });
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: 'No se pudieron agregar los productos al carrito',
            });
        };
    };
    async purchaseCart (req, res) {
        try {
            const idCart = req.params.cid;
            const cartID = parseInt(idCart);
            if(Number.isNaN(cartID)){
                CustomError.createError({
                    name: "Cart get by id error",
                    cause:generateErrorParam(cartID),
                    message:"Error obteniendo el carrito por el id.",
                    errorCode: EError.INVALID_PARAM
                });
            };
            const result = await ticketManagerMongo.purchaseCart(idCart);
            res.status(200).send({
                status: 'success',
                result
            });
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: 'No se puede efectuar la compra.',
            });
        }
    };
};