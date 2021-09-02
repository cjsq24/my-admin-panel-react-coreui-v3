import axios from '../../helpers/interceptor'
import { showAlert, loadingAlert } from '../../helpers/handleAlert'
import { roles } from '../actionTypes'

const base = 'roles'

const actions = {
   list: () => async (dispatch, getState) => {
      const {role} = getState()
      if (!role.listFetched) {
         await dispatch({ type: roles.LIST_LOADING_ROLE })
         const {data} = await axios.get(`/${base}/list`)
         await dispatch({ type: roles.LIST_ROLE, payload: data })
         await showAlert(data.message)
      }
   },

	create: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: roles.LOADING_ROLE })
      const {data} = await axios.post(`/${base}/create`, _data)
      await dispatch({ type: roles.CREATE_ROLE, payload: data })
      await showAlert(data.message)
      return data
	},

   update: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: roles.LOADING_ROLE })
      const {data} = await axios.put(`/${base}/update/${_data.id}`, _data)
      await dispatch({ type: roles.UPDATE_ROLE, payload: data })
      await showAlert(data.message)
      return data;
	},
   
   delete: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: roles.LOADING_ROLE })
      const {data} = await axios.delete(`/${base}/delete/${_data.id}`)
      await dispatch({ type: roles.DELETE_ROLE, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	},
}

export default actions