import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import roleActions from '../../redux/role/action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';
import RoleSearch from './Search'

const fields = ['id', 'name', 'key_name']

export default function Roles() {
   const dispatch = useDispatch()
   const role = useSelector(store => store.role)

   useEffect(() => {
      dispatch(roleActions.list())
   }, [dispatch]);

   const [modal, setModal] = useState(false);
   const openSearch = () => {
      setModal(true)
   }
   const closeSearch = () => {
      setModal(false)
   }

   return (
      <CardSimple title='Roles'>
         <RoleSearch modal={modal} closeSearch={closeSearch} />
         <DataTable
            items={role}
            fields={fields}
            actions={roleActions}
            url='roles'
            showModal={openSearch}
         />
      </CardSimple>
   );
}