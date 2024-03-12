import { client } from '..'
import { ChatModel } from '../models/models/chat'
import { ChatModel as ChatType, UserType } from '../types'

export const AllMembersAreUsers = async (members: string[]) => {
  if (!AllmembersAreDistinct(members)) return false
  const allUsers = (await client.users.getAll()).data
  const membersAreUsers = members.every((member) => allUsers.some((user) => user.user_id === member))
  return membersAreUsers
}

export const AllmembersAreDistinct = (members: string[]) => {
  const membersAreDistinct = members.length === new Set(members).size
  return membersAreDistinct
}

export const ChatEqual = async (members: string[]) => {
  const allChats = await ChatModel.getChatsByUser(members[0])
  const chatEqual = allChats.find(
    (chat) =>
      chat.members.length === members.length &&
      chat.members.every((member: UserType) => members.includes(member.user_id)),
  )
  return chatEqual as ChatType | undefined
}
