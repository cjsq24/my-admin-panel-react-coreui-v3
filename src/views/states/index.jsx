import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import stateActions from '../../redux/state/action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';

const fields = ['id', 'name', 'code', 'country']

export default function States() {
   const dispatch = useDispatch()
   const state = useSelector(store => store.state)

   useEffect(() => {
      dispatch(stateActions.list())
   }, [dispatch]);

   return (
      <CardSimple title='States'>
         <DataTable
            items={state}
            fields={fields}
            actions={stateActions}
            url='states'
            scopedSlots={{ 'country': (item) => ( <td>{item?.country?.name}</td> ) }}
         />
      </CardSimple>
   );
}