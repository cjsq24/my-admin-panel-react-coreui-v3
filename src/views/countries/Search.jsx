import { useState } from 'react';
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormGroup, CRow, CCol, CLabel, CInput } from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import InputT from '../../components/inputs/InputT'
import Select from '../../components/selects/Select'

import countryActions from '../../redux/country/action'

const colLabel = 'col-md-2 col-sm-12 col-xs-12'
const colInput = 'col-md-10 col-sm-12 col-xs-12'

export default function CountrySearch({ modal, openSearch, closeSearch }) {
   const dispatch = useDispatch()
   const { register, handleSubmit, reset } = useForm();

   const onSubmit = async (values) => {
      const params = {
         name: values.name !== '' ? values.name : undefined,
         code: values.code !== '' ? values.code : undefined,
         status: values.status !== '' ? values.status : undefined
      }

      await dispatch(countryActions.list(params))
      closeSearch()
   }

   return (
      <CForm onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
         <CModal
            show={modal}
            onClose={closeSearch}
         >
            <CModalHeader closeButton>Modal de Búsqueda</CModalHeader>
            <CModalBody>
                  <CFormGroup row>
                     <div className={colLabel}>
                        <CLabel htmlFor="name">Name</CLabel>
                     </div>
                     <div className={colInput}>
                        <InputT name='name' register={register} />
                     </div>
                  </CFormGroup>
                  <CFormGroup row>
                     <div className={colLabel}>
                        <CLabel htmlFor="code">Code</CLabel>
                     </div>
                     <div className={colInput}>
                        <InputT name='code' register={register} />
                     </div>
                  </CFormGroup>
                  <CFormGroup row>
                     <div className={colLabel}>
                        <CLabel htmlFor="status">Status</CLabel>
                     </div>
                     <div className={colInput}>
                        <Select
                           name='status'
                           data={[{value: '1', name: 'Activo'}, {value: '0', name: 'Inactivo'}]}
                           fields={{value: 'value', string: 'name'}}
                           register={register}
                        />
                     </div>
                  </CFormGroup>
            </CModalBody>
            <CModalFooter>
               <CButton color="warning" onClick={() => reset()}>Reset</CButton>
               <CButton color="danger" onClick={closeSearch}>Cancel</CButton>
               <CButton type="submit" color="info">Search</CButton>{' '}
            </CModalFooter>
         </CModal>
      </CForm>
   )
}