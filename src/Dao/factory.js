import {options} from "../config/options.js";

const persistence = options.server.persistence;
let contactsDao;

switch (persistence) {
    case "mongo":
        const {connectDB} = await import("../config/dbConnection.js");
        connectDB();
        const {UserManagerMongo} = await import("./managers/mongo/userManagerMongo.js")
        contactsDao = new UserManagerMongo();
    break;
    case "memory":
    break;
};

export {contactsDao}