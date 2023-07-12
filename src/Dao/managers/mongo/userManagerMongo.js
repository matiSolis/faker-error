import userModel from "../../models/user.model.js"
import { createHash } from '../../../utils.js';

export class UserManagerMongo {
    constructor(){
        this.model = userModel;
    };
    async post ({first_name, last_name, age, email, password}) {
        if (!first_name || !last_name || !age || !email || !password ) {
            throw new Error(`Faltan datos`);
        };
        const newUser = {
            first_name,
            last_name,
            age,
            email,
            password:  createHash(password)
        };
        const result = await this.model.create(newUser);
        return result;
    };
    async postGithub ({first_name, last_name, age, email, password}) {
        const newUser = {
            first_name,
            last_name,
            age,
            email,
            password
        };
        const result = await this.model.create(newUser);
        return result;
    };
    async findUserByEmail(username){
        const user = await this.model.findOne({email:username});
        return user;
    };
    async findUserById(id){
        const user = await this.model.findById(id);
        return user;
    };
    async findUserByJsonEmail(profile){
        const user = await this.model.findOne({email: profile._json.email});
        return user;
    };
};