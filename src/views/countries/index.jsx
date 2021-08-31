import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import countryActions from '../../redux/country/action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';

const fields = ['id', 'name', 'code']

export default function Countries() {
   const dispatch = useDispatch()
   const country = useSelector(store => store.country)

   useEffect(() => {
      dispatch(countryActions.list())
   }, [dispatch]);

   return (
      <CardSimple title='Countries'>
         <DataTable
            items={country}
            fields={fields}
            actions={countryActions}
            url='countries'
         />
      </CardSimple>
   );
}