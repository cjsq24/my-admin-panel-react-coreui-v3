import { roles } from '../actionTypes'
 
const initialState = {
   list: [],
   payload: {},
   listFetched: false,
   listLoading: true,
   filter: [],
   filterLoading: false,
   loading: false
};
 
const reducer = (state = initialState, { type, ...rest }) => {
   switch (type) {
      case roles.LIST_ROLE:
         state.list = (rest.payload.success) ? rest.payload.values : []
         state.listFetched = (rest.payload.success) ? true : false
         return { ...state, listLoading: false }

      case roles.LIST_LOADING_ROLE:
         return { ...state, listLoading: true }

      case roles.LOADING_ROLE:
         return { ...state, loading: true }

      case roles.CREATE_ROLE:
         if (rest.payload.success) {
            state.list.unshift({ ...rest.payload.values })
         }
         return { ...state, ...rest, loading: false }

      case roles.UPDATE_ROLE:
         if (rest.payload.success) {
            state.list = state.list.map(item => 
               item.id === rest.payload.values.id
               ? { ...item, ...rest.payload.values }
               : item
            )
         }
         return { ...state, ...rest, loading: false }

      case roles.DELETE_ROLE:
         if (rest.payload.success) {
            state.list = state.list.filter(item => item.id !== rest.payload.id)
         }
         return { ...state, ...rest, loading: false }

      default:
         return { ...state };
   }
};

export default reducer