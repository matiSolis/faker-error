import ChatManagerMongo from "../Dao/managers/mongo/chatManagerMongo.js";

const chatManagerMongo = new ChatManagerMongo();

export default class ChatController{
    async getAllMessages (req, res){
        try {
            const result = await chatManagerMongo.getMessages();
            return res.status(200).send({
                status: "success",
                result
            });
        }catch (err) {
            res.status(400).send({
                status: "Error",
                msg: `Los mensajes no se pueden visualizar.`
            });
        };
    };

};