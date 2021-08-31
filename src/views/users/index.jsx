import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import userActions from '../../redux/user/action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';

const fields = ['id', 'name', 'email']

export default function Users() {
   const dispatch = useDispatch()
   const user = useSelector(store => store.user)

   useEffect(() => {
      dispatch(userActions.list())
   }, [dispatch]);

   return (
      <CardSimple title='Users'>
         <DataTable
            items={user}
            fields={fields}
            actions={userActions}
            url='users'
            scopedSlots={{ 'name': (item) => ( <td>{`${item.name} ${item.last_name}`}</td> ) }}
         />
      </CardSimple>
   );
}