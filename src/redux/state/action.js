import axios from '../../helpers/interceptor'
import { showAlert, loadingAlert } from '../../helpers/handleAlert'
import { states } from '../actionTypes'

const base = '/states'

const actions = {   
   list: () => async (dispatch, getState) => {
      const {state} = getState()
      if (!state.listFetched) {
         await dispatch({ type: states.LIST_LOADING_STATE })
         const {data} = await axios.get(`${base}/list`)
         showAlert(data.message)
         await dispatch({ type: states.LIST_STATE, payload: data })
      }
   },

   filter: (_data) => async (dispatch) => {
      await dispatch({ type: states.FILTER_LOADING_STATE })
      const {data} = await axios.get(`${base}/filter`, { params: {..._data}})
      await dispatch({ type: states.FILTER_STATE, payload: data })
   },

	create: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: states.LOADING_STATE })
      const {data} = await axios.post(`${base}/create`, _data)
      await dispatch({ type: states.CREATE_STATE, payload: data })
      await showAlert(data.message)
      return data;
	},

   update: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: states.LOADING_STATE })
      const {data} = await axios.put(`${base}/update/${_data.id}`, _data)
      await dispatch({ type: states.UPDATE_STATE, payload: data })
      await showAlert(data.message)
      return data;
	},

   delete: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: states.LOADING_STATE })
      const {data} = await axios.delete(`${base}/delete/${_data.id}`)
      await dispatch({ type: states.DELETE_STATE, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	}
}

export default actions