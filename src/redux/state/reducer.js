import { states } from '../actionTypes'
 
const initialState = {
   list: [],
   payload: {},
   listFetched: false,
   listLoading: false,
   filter: [],
   filterLoading: false,
   loading: false
};

const reducer = (state = initialState, { type, ...rest }) => {
   switch (type) {
      case states.LOADING_STATE:
         return { ...state, loading: true }

      case states.LIST_STATE:
         state.list = (rest.payload.success) ? rest.payload.values : []
         state.listFetched = (rest.payload.success) ? true : false
         return { ...state, listLoading: false }

      case states.LIST_LOADING_STATE:
         return { ...state, listLoading: true }

      case states.FILTER_STATE:
         state.filter = (rest.payload.success) ? rest.payload.values : []
         return { ...state, filterLoading: false }

      case states.FILTER_LOADING_STATE:
         return { ...state, filterLoading: true }

      case states.CREATE_STATE:
         if (rest.payload.success) {
            state.list.unshift({ ...rest.payload.values }) //Sumamos el registro agregado a la lista
         }
         return { ...state, ...rest, loading: false }

      case states.UPDATE_STATE:
         if (rest.payload.success) {
            state.list = state.list.map(item => 
               item.id === rest.payload.values.id
               ? { ...item, ...rest.payload.values }
               : item
            )
         }
         return { ...state, ...rest, loading: false }

      case states.DELETE_STATE:
         if (rest.payload.success) {
            state.list = state.list.filter(item => item.id !== rest.payload.id)
         }
         return { ...state, ...rest, loading: false }
         
      default:
         return { ...state };
   }
};

export default reducer