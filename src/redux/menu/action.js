import axios from '../../helpers/interceptor'
import { showAlert, loadingAlert } from '../../helpers/handleAlert'
import { menus } from '../actionTypes'

const base = 'menus'

const actions = {
   list: () => async (dispatch, getState) => {
      const {menu} = getState()
      if (!menu.listFetched) {
         await dispatch({ type: menus.LIST_LOADING_MENU })
         const {data} = await axios.get(`/${base}/list`)
         await dispatch({ type: menus.LIST_MENU, payload: data })
         await showAlert(data.message)
      }
   },
	create: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: menus.LOADING_MENU })
      const {data} = await axios.post(`/${base}/create`, _data)
      await dispatch({ type: menus.CREATE_MENU, payload: data })
      await showAlert(data.message)
      return data
	},
   update: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: menus.LOADING_MENU })
      const {data} = await axios.put(`/${base}/update/${_data.id}`, _data)
      await dispatch({ type: menus.UPDATE_MENU, payload: data })
      await showAlert(data.message)
      return data;
	},
   delete: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: menus.LOADING_MENU })
      const {data} = await axios.delete(`/${base}/delete/${_data.id}`)
      await dispatch({ type: menus.DELETE_MENU, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	},
}

export default actions