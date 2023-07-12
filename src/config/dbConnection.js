import mongoose from "mongoose";
import {options} from "./options.js";
import { EError } from "../enums/EError.js";
import { generateDBError } from "../services/DbError.js";

export const connectDB = async()=>{
    try {
        mongoose.connect(options.mongoDB.url);
    } catch (error) {
        CustomError.createError({
            name: "Database Error",
            cause:generateDBError(options.mongoDB.url),
            message:"Error al intentar conectarse a la base de datos.",
            errorCode: EError.DATABASE_ERROR
        });
    };
};


