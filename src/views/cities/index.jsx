import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cityActions from '../../redux/city/action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';

const fields = ['id', 'name', 'code', 'country', 'state']

export default function Cities() {
   const dispatch = useDispatch()
   const city = useSelector(store => store.city)

   useEffect(() => {
      dispatch(cityActions.list())
   }, [dispatch]);

   return (
      <CardSimple title='Cities'>
         <DataTable
            items={city}
            fields={fields}
            actions={cityActions}
            url='cities'
            scopedSlots={{ 
               'country': (item) => ( <td>{item?.state?.country?.name}</td> ),
               'state': (item) => ( <td>{item?.state?.name}</td> )
            }}
         />
      </CardSimple>
   );
}