import { Model } from 'sequelize'

export interface ChatModel extends Model {
  id: string
  name: string
}

export interface MessageModel extends Model {
  id: string
  chat_id: string
  user_id: string
  message: string
}

export interface Chat_userModel extends Model {
  id: number
  user_id: string
  chat_id: string
}

export interface UserType {
  created_at: string //"2024-03-07T18:10:34.413Z",
  email: string //"dubreucq02@gmail.com",
  email_verified: boolean //true,
  family_name: string //"Dubreucq",
  given_name: string //"Agustin",
  identities?: [
    {
      provider?: string //"google-oauth2",
      user_id?: string //"107935143703615192076",
      connection?: string //"google-oauth2",
      isSocial?: boolean //true
    },
  ]
  locale: boolean //"es-419",
  name: string //"Agustin Dubreucq",
  nickname: string //"dubreucq02",
  picture: string //"https://lh3.googleusercontent.com/a/ACg8ocIiNTjiXKGOyZoOtEvp8f4PsH98mrzbuV0LNDFsGLpr=s96-c",
  updated_at: string //"2024-03-09T10:39:07.922Z",
  user_id: string //"google-oauth2|107935143703615192076",
  last_ip: string //"2800:af0:110c:6a6:31d8:c9ba:d937:73ed",
  last_login: string //"2024-03-09T10:39:07.922Z",
  logins_count: number //7
}

export interface UserInfo {
  sub: string //'google-oauth2|103341753629051677112'
  given_name: string //'Agustin'
  family_name: string //'DUBREUCQ'
  nickname: string //'adubreucq395'
  name: string //'Agustin DUBREUCQ'
  picture: string //'https://lh3.googleusercontent.com/a/ACg8ocIzigzk4NpQnsUsjkinJeH9fQr0bp6d48yVfcd1Ms-x=s96-c'
  locale: string //'es'
  updated_at: string //'2024-03-13T12:28:50.263Z'
}
