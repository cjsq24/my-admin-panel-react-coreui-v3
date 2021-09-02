import { menus } from '../actionTypes'
 
const initialState = {
   list: [],
   payload: {},
   listFetched: false,
   listLoading: true,
   loading: false
};
 
const reducer = (state = initialState, { type, ...rest }) => {
   switch (type) {
      case menus.LIST_MENU:
         state.list = (rest.payload.success) ? rest.payload.values : []
         state.listFetched = (rest.payload.success) ? true : false
         return { ...state, listLoading: false }

      case menus.LIST_LOADING_MENU:
         return { ...state, listLoading: true }

      case menus.LOADING_MENU:
         return { ...state, loading: true }

      case menus.CREATE_MENU:
         if (rest.payload.success) {
            state.list.unshift({ ...rest.payload.values })
         }
         return { ...state, ...rest, loading: false }

      case menus.UPDATE_MENU:
         if (rest.payload.success) {
            state.list = state.list.map(item => 
               item.id === rest.payload.values.id
               ? { ...item, ...rest.payload.values }
               : item
            )
         }
         return { ...state, ...rest, loading: false }

      case menus.DELETE_MENU:
         if (rest.payload.success) {
            state.list = state.list.filter(item => item.id !== rest.payload.id)
         }
         return { ...state, ...rest, loading: false }

      default:
         return { ...state };
   }
};

export default reducer