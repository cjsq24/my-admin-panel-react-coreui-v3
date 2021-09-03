import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import countryActions from '../../redux/country/action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';
import CountrySearch from './Search'

const fields = ['id', 'name', 'code']

export default function Countries() {
   const dispatch = useDispatch()
   const country = useSelector(store => store.country)

   const [modal, setModal] = useState(false);
   const openSearch = () => {
      setModal(true)
   }
   const closeSearch = () => {
      setModal(false)
   }

   useEffect(() => {
      dispatch(countryActions.list())
   }, [dispatch]);

   return (
      <CardSimple title='Countries'>
         <CountrySearch modal={modal} closeSearch={closeSearch} />
         <DataTable
            items={country}
            fields={fields}
            actions={countryActions}
            url='countries'
            showModal={openSearch}
         />
      </CardSimple>
   );
}