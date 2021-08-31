import { Route, Redirect } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import TheLayout from '../containers/TheLayout';
//import AdminPanel from '../containers/layouts/AdminPanel';

export default function PrivateRoute({ component: Component, ...rest }) {
   const auth = useAuth()

   return (
      <Route {...rest}>
         {auth.isLogged() ? (
            <TheLayout>
               <Component />
            </TheLayout>
         ) : (
            <Redirect to='/login' />
         )}
      </Route>
   );
}