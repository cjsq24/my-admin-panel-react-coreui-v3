import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cityActions from '../../redux/city/action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';
import StateSearch from './Search'

const fields = ['id', 'name', 'code', 'country', 'state']

export default function Cities() {
   const dispatch = useDispatch()
   const city = useSelector(store => store.city)
   
   useEffect(() => {
      dispatch(cityActions.list())
   }, [dispatch]);

   const [modal, setModal] = useState(false);
   const openSearch = () => {
      setModal(true)
   }
   const closeSearch = () => {
      setModal(false)
   }


   return (
      <CardSimple title='Cities'>
         <StateSearch modal={modal} closeSearch={closeSearch} />
         <DataTable
            items={city}
            fields={fields}
            actions={cityActions}
            url='cities'
            scopedSlots={{ 
               'country': (item) => ( <td>{item?.state?.country?.name}</td> ),
               'state': (item) => ( <td>{item?.state?.name}</td> )
            }}
            showModal={openSearch}
         />
      </CardSimple>
   );
}