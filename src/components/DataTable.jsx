import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CDataTable, CBadge, CButton, CCol, CRow } from '@coreui/react';

export default function DataTable(props) {
   const fields = [
      '#',
      ...props.fields,
      { key: 'status', _style: {} },
      {
         key: 'actions',
         label: '',
         _style: { width: '15%' },
         sorter: false,
         filter: false
      }
   ]

   const dispatch = useDispatch()
   const history = useHistory()

   const getBadge = (status) => {
      switch (status) {
         case '1': return 'success'
         case '0': return 'secondary'
         default: return 'primary'
      }
   }

   const showCreate = () => {
      history.push(`/${props.url}/create`)
   }

   const showUpdate = (item) => {
      history.push(`/${props.url}/update`, { data: item })
   }
   const deleteRecord = async (id) => {
      if (window.confirm("Confirm delete that record?")) {
         await dispatch(props.actions.delete({ id: id }))
      }
   }

   return (
      <CCol>
         <CRow>
            <CCol className='d-flex justify-content-end mb-2'>
               <CButton size='md' color='secondary' className='ml-1 d-flex justify-content' onClick={props.showModal}>
                  B
               </CButton>
               <CButton size='md' color='success' className='ml-1 d-flex justify-content' onClick={showCreate}>
                  A
               </CButton>
            </CCol>
         </CRow>

         <CDataTable
            items={props.items.list}
            fields={fields}
            itemsPerPage={10}
            hover
            sorter
            pagination
            loading={props.items.listLoading}
            striped
            responsive
            scopedSlots={{
               ...props?.scopedSlots,
               '#': 
                  (item, key) => (
                     <td>{key + 1}</td>
                  ),
               'status':
                  (item) => (
                     <td>
                        <CBadge color={getBadge(item.status)}>
                           {item.status === '1' ? 'Active' : 'Inactive'}
                        </CBadge>
                     </td>
                  ),
               'actions':
                  (item, index) => {
                     return (
                        <td className="py-2">
                           <CButton size="sm" color="info" onClick={() => showUpdate(item)}>
                              U
                           </CButton>
                           <CButton size="sm" color="danger" className="ml-1" onClick={() => deleteRecord(item.id)}>
                              D
                           </CButton>
                        </td>
                     )
                  }
            }}
         />
      </CCol>
   );
}