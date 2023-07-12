import messagesModel from "../../models/messages.model.js";

export default class ChatManagerMongo {
    async getMessages (){
        const messages = await messagesModel.find();
        return messages;
    };
};