import axios from 'axios'
import get from 'lodash-es/get'
const BASE_URL = process.env.VUE_APP_API_AUTHENTICATION + '/user'

const APIHelper = () => ({
  signIn: async (body) => {
    try {
      const payload = await axios.post(BASE_URL + '/signin', body)
      if (payload.data.accessToken && payload.data.refreshToken) {
        return payload.data
      } else {
        throw new Error(
          `[SignIn] Invalid sign in response ${JSON.stringify(payload.data)}`
        )
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  refreshToken: async (authUser) => {
    let params = {
      refreshToken: authUser.refreshToken
    }
    try {
      const payload = await axios.get(BASE_URL + `/refresh/${authUser.id}`, {
        params: { ...params, vendorId: authUser.vendorId }
      })
      return payload.data
    } catch (error) {
      const codeError = get(error, 'response.data.code')
      if (codeError === '2005') {
        throw new Error('Tài khoản đã được đăng trên một thiết bị khác !')
      } else throw new Error(error)
    }
  }
})

export const Auth = APIHelper()
export default {
  Auth
}