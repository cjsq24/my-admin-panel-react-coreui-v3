import { users } from '../actionTypes'
 
const initialState = {
   list: [],
   payload: {},
   listFetched: false,
   listLoading: true,
   loading: false
};
 
const reducer = (state = initialState, { type, ...rest }) => {
   switch (type) {
      case users.LIST_USER:
         state.list = (rest.payload.success) ? rest.payload.values : []
         state.listFetched = (rest.payload.success) ? true : false
         return { ...state, listLoading: false }

      case users.LIST_LOADING_USER:
         return { ...state, listLoading: true }

      case users.LOGIN_USER:
         return { ...state, loading: false }

      case users.LOADING_USER:
         return { ...state, loading: true }

      case users.CREATE_USER:
         if (rest.payload.success) {
            state.list.unshift({ ...rest.payload.values })
         }
         return { ...state, ...rest, loading: false }

      case users.REGISTER_USER:
         return { ...state, ...rest, loading: false }

      case users.UPDATE_USER:
         if (rest.payload.success) {
            state.list = state.list.map(item => 
               item.id === rest.payload.values.id
               ? { ...item, ...rest.payload.values }
               : item
            )
         }
         return { ...state, ...rest, loading: false }

      case users.DELETE_USER:
         if (rest.payload.success) {
            state.list = state.list.filter(item => item.id !== rest.payload.id)
         }
         return { ...state, ...rest, loading: false }

      default:
         return { ...state };
   }
};

export default reducer