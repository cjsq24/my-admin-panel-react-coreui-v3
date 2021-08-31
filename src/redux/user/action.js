import axios from '../../helpers/interceptor'
import { showAlert, loadingAlert } from '../../helpers/handleAlert'
import { users } from '../actionTypes'

const base = 'users'

const actions = {
   login: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: users.LOADING_USER })
      const {data} = await axios.post(`/${base}/login`, _data)
      await dispatch({ type: users.LOGIN_USER, payload: data })
      await showAlert(data.message)
      return data
   },

   list: () => async (dispatch, getState) => {
      const {user} = getState()
      if (!user.listFetched) {
         await dispatch({ type: users.LIST_LOADING_USER })
         const {data} = await axios.get(`/${base}/list`)
         await dispatch({ type: users.LIST_USER, payload: data })
         await showAlert(data.message)
      }
   },

	create: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: users.LOADING_USER })
      const {data} = await axios.post(`/${base}/create`, _data)
      await dispatch({ type: users.CREATE_USER, payload: data })
      await showAlert(data.message)
      return data
	},


   register: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: users.LOADING_USER })
      const {data} = await axios.post(`/${base}/register`, _data)
      await dispatch({ type: users.REGISTER_USER, payload: data })
      await showAlert(data.message)
      return data
	},

   update: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: users.LOADING_USER })
      const {data} = await axios.put(`/${base}/update/${_data.id}`, _data)
      await dispatch({ type: users.UPDATE_USER, payload: data })
      await showAlert(data.message)
      return data;
	},

   delete: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: users.LOADING_USER })
      const {data} = await axios.delete(`/${base}/delete/${_data.id}`)
      await dispatch({ type: users.DELETE_USER, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	}
}

export default actions