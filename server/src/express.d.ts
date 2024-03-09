export interface User {
  sub: string//id
  locale: string
  updated_at: string
  given_name: string //'Agustin',
  family_name: string //'Dubreucq',
  nickname: string //'dubreucq02',
  name: string //'Agustin Dubreucq',
  picture: string //'https://lh3.googleusercontent.com/a/ACg8ocIiNTjiXKGOyZoOtEvp8f4PsH98mrzbuV0LNDFsGLpr=s96-c',
}

declare global {
  namespace Express {
    export interface Request extends Request {
      user?: User // Puedes definir cualquier tipo
    }

    export interface Response<Locals extends user = User> extends Response {
      
    }
  }
}
