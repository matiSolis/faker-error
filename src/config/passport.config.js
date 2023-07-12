import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { validatePassword } from '../utils.js';
import { contactService } from "../repository/index.js";
import userModel from '../Dao/models/user.model.js';
import { EError } from '../enums/EError.js';
import { generateUserErrorInfo } from '../services/errorInfo.js';
import { generateErrorParam } from '../services/errorParam.js';
import { generateAuthenticationErrorParam } from '../services/authenticationError.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                const user = await userModel.findOne({ email: username });
                if (user) {
                    return done(null, false, { message: 'El usuario ya existe.' });
                };
                if(!first_name || !last_name || !email || !age) {
                    CustomError.createError({
                        name: "User create error",
                        cause: generateUserErrorInfo(req.body),
                        message: "Error creando el usuario.",
                        errorCode: EError.INVALID_JSON
                    });
                };
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password
                };
                const result = await contactService.createContact(newUser);
                return done(null, result, { message: 'Usuario registrado exitosamente' });
            } catch (error) {
                return done("Error al registrar el usuario: " + error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        const userID = parseInt(user._id);
        if(Number.isNaN(userID)){
            CustomError.createError({
                name: "User get by id error",
                cause:generateErrorParam(user._id),
                message:"Error obteniendo el usuario por el id.",
                errorCode: EError.INVALID_PARAM
            });
        };
            done(null, user._id);
    });

    passport.deserializeUser( async (id, done)=>{
        const userID = parseInt(id);
        if(Number.isNaN(userID)){
            CustomError.createError({
                name: "User get by id error",
                cause:generateErrorParam(id),
                message:"Error obteniendo el usuario por el id.",
                errorCode: EError.INVALID_PARAM
            });
        };
        const user = await userModel.findById(id);
        done(null, user)
    });

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                if (!user) {{   
                        CustomError.createError({
                            name: "Email user auth error.",
                            cause: generateAuthenticationErrorParam(user),
                            message: "Error autenticando el usuario por email.",
                            errorCode: EError.AUTH_ERROR
                        });
                    };
                    return done(null, false);
                }
                if (!validatePassword(password, user)) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done("Error al intentar ingresar: " + error);
            }
        }
    ));

    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.8d404415d7c956ee',
            clientSecret: 'aaddafdf749d73f2bf53fb45473024714da1f093',
            callbackURL: 'http://localhost:8080/api/session/githubcallback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                const user = await userModel.findOne({ email: profile._json.email });
                if (!user) {
                    const email = profile._json.email || `${profile._json.name.replace(/\s+/g, '')}@github.com`;
                    const nameParts = profile._json.name.split(' ');
                    const newUser = {
                        first_name: nameParts[0],
                        last_name: nameParts[1] || '',
                        email: email,
                        age: 18,
                        password: 1234,
                        role: 'User'
                    };
                    const result = await contactService.createContactGitHub(newUser);
                    done(null, result);
                } else {
                    done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));
};

export default initializePassport;
