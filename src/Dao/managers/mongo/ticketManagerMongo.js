import cartModel from "../../models/cart.model.js";
import ticketModel from "../../models/ticket.model.js";
import userModel from "../../models/user.model.js";
import {code} from "../../../helpers/code.js";
import {date} from "../../../helpers/date.js";
import { sendMailTicket } from "../../../helpers/sendMailTicket.js";

export default class TicketManagerMongo{
    async purchaseCart(idCart) {
        const cart = await cartModel.findById(idCart).populate("products.product");
        let totalAmount = 0;
        const productsWithStock = [];
        for (const productInCart of cart.products) {
            const product = productInCart.product;
            if (productInCart.quantity <= product.stock) {
                product.stock -= productInCart.quantity;
                await product.save();
                totalAmount += product.price * productInCart.quantity;
            } else {
                totalAmount += product.price * product.stock;
                productsWithStock.push(productInCart);
                product.stock -= productInCart.quantity;
                await product.save();
            };
        };
        const generateCode = await code();
        const generateDate = await date();
        const user = await userModel.findOne({ cart: idCart });
        const purchaserEmail = user.email;
        const ticketData = {
            code: generateCode,
            purchase_dateTime: generateDate,
            amount: totalAmount,
            purchaser: purchaserEmail
        };
        await sendMailTicket(generateCode, generateDate, totalAmount, purchaserEmail);
        const ticket = await ticketModel.create(ticketData);
        cart.products = productsWithStock;
        await cart.save();
        return ticket;
    };
};