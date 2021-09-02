import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import roleActions from '../../redux/role/action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';

const fields = ['id', 'name', 'key_name']

export default function Roles() {
   const dispatch = useDispatch()
   const role = useSelector(store => store.role)

   useEffect(() => {
      dispatch(roleActions.list())
   }, [dispatch]);

   return (
      <CardSimple title='Roles'>
         <DataTable
            items={role}
            fields={fields}
            actions={roleActions}
            url='roles'
         />
      </CardSimple>
   );
}