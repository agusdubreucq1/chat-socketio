import axios from 'axios'
import { UserType } from '../vite-env'

const API_URL = process.env.API_URL

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/user`)
  return response.data.data as UserType[]
}
