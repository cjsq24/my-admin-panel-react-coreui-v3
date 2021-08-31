import { combineReducers } from 'redux'
import sidebar from './sidebar/reducer'
import user from './user/reducer'
import note from './note/reducer'
import country from './country/reducer'
import state from './state/reducer'
import city from './city/reducer'

const rootReducer = combineReducers({
   sidebar,
   user,
   note,
   country,
   state,
   city
})
 
export default rootReducer
