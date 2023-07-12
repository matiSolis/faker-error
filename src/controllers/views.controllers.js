import ViewsManagerMongo from "../Dao/managers/mongo/viewsManagerMongo.js";
import ProductManagerMongo from "../Dao/managers/mongo/productManagerMongo.js";

const viewsManagerMongo = new ViewsManagerMongo();
const productManagerMongo = new ProductManagerMongo();
export default class ViewsController {
    async homeRender (req, res) {
        try {
            if(req.session.user.role ==='Admin'){
                return res.redirect('/admin');
            }else{
                await viewsManagerMongo.homeRender(req, res);
            };
        }catch (error) {
            console.error(error);
            res.status(500).send({
                status: 'Error',
                msg: 'Error del servidor.',
            });
        };
    };
    async adminRender (req, res) {
        try {
            const products = await productManagerMongo.productsFindLean();
            res.render('admin', { user: req.session.user, products });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: 'Error',
                msg: 'Error del servidor.',
            });
        };
    };
    async chatRender (req, res) {
        try {
            const user = req.session.user;
            const userEmail = user.email;
            res.render('chat',);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: 'Error',
                msg: 'Error del servidor.',
            });
        };
    };
    async currentRender (req, res) {
        try {
            res.render('current',{ user: req.session.user });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: 'Error',
                msg: 'Error del servidor.',
            });
        };
    };
    async cartRender (req, res) {
        try {
            await viewsManagerMongo.cartRender(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: 'Error',
                msg: 'Error del servidor.',
            });
        };
    };
    async productRender (req, res) {
        try {
            await viewsManagerMongo.productRender(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: 'Error',
                msg: 'Error del servidor.',
            });
        };
    };
    async productsRender (req, res) {
        try {
            await viewsManagerMongo.productsRender(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: 'Error',
                msg: 'Error del servidor.',
            });
        };
    };
    async registerRender (req, res) {
        try {
            res.render('register');
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: 'Error',
                msg: 'Error del servidor.',
            });
        };
    };
    async loginRender (req, res) {
        try {
            res.render('login');
        } catch (error) {
            console.error(error);
            res.status(500).send({
                status: 'Error',
                msg: 'Error del servidor.',
            });
        };
    };
}