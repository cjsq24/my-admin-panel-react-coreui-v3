import { countries } from '../actionTypes'
 
const initialState = {
   list: [],
   payload: {},
   listFetched: false,
   listLoading: true,
   loading: false
};
 
const reducer = (state = initialState, { type, ...rest }) => {
   switch (type) {
      case countries.LIST_COUNTRY:
         state.list = (rest.payload.success) ? rest.payload.values : []
         state.listFetched = (rest.payload.success) ? true : false
         return { ...state, listLoading: false }

      case countries.LIST_LOADING_COUNTRY:
         return { ...state, listLoading: true }

      case countries.LOADING_COUNTRY:
         return { ...state, loading: true }

      case countries.CREATE_COUNTRY:
         if (rest.payload.success) {
            state.list.unshift({ ...rest.payload.values }) //Sumamos el registro agregado a la lista
         }
         return { ...state, ...rest, loading: false }

      case countries.UPDATE_COUNTRY:
         if (rest.payload.success) {
            state.list = state.list.map(item => 
               item.id === rest.payload.values.id
               ? { ...item, ...rest.payload.values }
               : item
            )
         }
         return { ...state, ...rest, loading: false }

      case countries.DELETE_COUNTRY:
         if (rest.payload.success) {
            state.list = state.list.filter(item => item.id !== rest.payload.id)
         }
         return { ...state, ...rest, loading: false }

      default:
         return { ...state };
   }
};

export default reducer