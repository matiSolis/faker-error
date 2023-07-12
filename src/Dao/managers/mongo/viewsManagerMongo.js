import cartModel from "../../models/cart.model.js";
import productModel from "../../models/products.model.js";

export default class ViewsManagerMongo{
    async cartRender(req, res) {
        const { cid } = req.params;
        try {
            const cart = await cartModel.findById(cid).populate("products.product").lean();
            if (!cart) {
                return res.status(204).end();
            };
            const total = cart.products.reduce((acc, product) => {
                return acc + product.product.price * product.quantity;
            }, 0);
            res.render("cart", {user: req.session.user, title: "Carrito", cart, total });
        } catch (error) {
            res.status(500).send({
                status: "Error",
                msg: `Error!.`
            });
        };
    };
    async currentRender(req,res) {
        try {
            res.render('/current',{
                user: req.session.user
            });
        } catch (error) {
            res.status(500).send({
                status: "Error",
                msg: `Error!.`
            });
        }
    };
    async homeRender(req, res) {
        const { page = 1, limit, query } = req.query;
        const opt = { page, limit: parseInt(limit) || 6, lean: true };
        opt.sort = { price: -1 };
        const filter = {};
        if (query) {
            filter.$or = [
                { category: { $regex: new RegExp(query, 'i') } },
                { title: { $regex: new RegExp(query, 'i') } }
            ];
        } else {
            filter.category = { $exists: true };
        };
        const { docs } = await productModel.paginate(filter, opt);
        const products = docs;
        res.render('home', {
            user: req.session.user,
            title: "EL EMPORIO DEL JARDIN",
            products
        });
    };
    async productRender(req, res) {
        try {
            const idProduct = req.params.pid;
            const product = await productModel.findById(idProduct).lean();    
            if (!product) {
                return res.status(204).end();
            };
            res.render('product', { user: req.session.user, product });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: "Error",
                msg: `Error del servidor.`
            });
        };
    };
    async productsRender(req, res) {
        try {
            let { page = 1, limit, query, sort, category } = req.query;
            const opt = { page, limit: parseInt(limit) || 4, lean: true };
            if (sort) {
                opt.sort = { [sort]: 1 };
            } else {
                opt.sort = { title: 1 };
            };
            const filter = {};
            if (query) {
                filter.$or = [
                    { category: { $regex: new RegExp(query, 'i') } },
                    { title: { $regex: new RegExp(query, 'i') } }
                ];
            };
            if (category) {
                filter.category = category;
            } else {
                filter.category = { $exists: true };
            };
            const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, status, totalpage } = await productModel.paginate(filter, opt);
            const products = docs;
            const message = products.length === 0 ? 'Los productos no se pudieron encontrar' : '';
            const urlParams = { page, limit, query, sort, category };
            res.render('prod', {
            title: "EL EMPORIO DEL JARDIN",
            status,
            totalpage,
            products,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            query,
            message,
            urlParams,
            user: req.session.user
            });
        } catch (error) {
            res.status(500).send({
                status: "Error",
                msg: `Error al obtener los productos.`
            });
        };
    };
};