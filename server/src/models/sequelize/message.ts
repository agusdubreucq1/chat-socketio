import { DataTypes } from "sequelize";
import { db } from "./conection";
import { MessageModel } from "../../types";


export const Message = db.define<MessageModel>("messages", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    chat_id: {
        type: DataTypes.UUID,
    },
    user_id: {
        type: DataTypes.UUID,
    },
    message: {
        type: DataTypes.STRING,
    },
});