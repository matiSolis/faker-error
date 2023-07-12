import passport from "passport";
import { sendMailRegister } from "../helpers/sendMailRegister.js";

export default class SessionController {
    async register (req, res) {
        try {
            const user = req.body;
            await sendMailRegister(user);
            res.send({ status: 'success', message: 'User registered' });
        } catch (error) {
            console.log('Error en el registro:', error);
            res.send({ error: 'Error en el registro' });
        };
    };
    async failRegister (req, res) {
        console.log('Fallo en el registro');
        res.send({error: 'Error en el registro'})
    };
    async login(req, res, next) {
        passport.authenticate('login', (err, user) => {
            if (err) {
                return res.status(500).send({ status: 'error', error: 'Error en el servidor' });
            };
            if (!user) {
                return res.status(400).send({ status: 'error', error: 'Credenciales inválidas' });
            };
            req.logIn(user, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({ status: 'error', error: 'Error en el servidor' });
                };
                req.session.user = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    age: user.age,
                    email: user.email,
                    cart: user.cart,
                    role: user.role
                };
                if (user.role === "Admin") {
                    return res.redirect('/admin');
                } else {
                    return res.send({ status: 'success', payload: user, message: 'Logueo de usuario exitoso.' });
                };
            });
        })(req, res, next);
    };
    async failLogin (req, res) {
        console.log('Fallo en el ingreso')
        res.status(400).send({error:'Error en el ingreso.'})
    };
    async logout (req, res) {
        req.session.destroy(err =>{
            if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"});
            res.redirect('/login');
        });
    };
    async github (req, res, next) {
        passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
    };
    async githubCallbacks (req, res) {
        req.session.user = req.user;
        res.redirect('/');
    };
}