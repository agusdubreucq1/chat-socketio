import axios from 'axios'
import { API_URL } from '../const'
import { UserType } from '../vite-env'

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/user`)
  return response.data.data as UserType[]
}
