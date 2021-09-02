import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import menuActions from '../../redux/menu/action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';

const fields = ['id', 'name', 'url']

export default function Menus() {
   const dispatch = useDispatch()
   const menu = useSelector(store => store.menu)

   useEffect(() => {
      dispatch(menuActions.list())
   }, [dispatch]);

   return (
      <CardSimple title='Menus'>
         <DataTable
            items={menu}
            fields={fields}
            actions={menuActions}
            url='menus'
         />
      </CardSimple>
   );
}