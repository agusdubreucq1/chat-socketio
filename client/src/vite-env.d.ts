/// <reference types="vite/client" />
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

export interface ChatTypeResponse {
  id: string // "57bf2fa4-cd21-4d1b-9c44-a73929c75edf",
  name: string //'chat'
  createdAt: string //'2024-03-09T18:18:12.000Z'
  updatedAt: string //'2024-03-09T18:18:12.000Z'
  members: UserType[]
}

export interface MessageTypeResponse {
  id: string//'1684b043-bf3c-4225-a684-c78aff623dc8'
  chat_id: string//'c9a3ced5-aee6-47eb-8114-0740ab970514'
  user_id: string//'google-oauth2|107935143703615192076'
  message: string//'hola como andas'
  createdAt: string//'2024-03-12T21:52:03.000Z'
  updatedAt: string//'2024-03-12T21:52:03.000Z'
}
