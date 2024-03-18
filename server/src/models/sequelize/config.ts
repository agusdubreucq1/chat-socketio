import { Chat } from "./chat"
import { Chat_user } from "./chat_user"
import { db } from "./conection"
import { Message } from "./message"

Chat_user.belongsTo(Chat, {foreignKey: 'chat_id'})
Chat.belongsToMany(Chat_user, {through: 'chat_id'})
Chat.belongsTo(Message, {foreignKey: 'last_message_id', targetKey: 'id'})

export const initDb = async () =>{
    try{
        await db.sync()
    } catch(error){
        console.log(error)
    }
}