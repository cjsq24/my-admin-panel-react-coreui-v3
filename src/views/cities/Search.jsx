import { useState, useEffect } from 'react';
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormGroup, CLabel } from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import InputT from '../../components/inputs/InputT'
import Select from '../../components/selects/Select'

import cityActions from '../../redux/city/action'
import countryActions from '../../redux/country/action'
import stateActions from '../../redux/state/action'

const colLabel = 'col-md-2 col-sm-12 col-xs-12'
const colInput = 'col-md-10 col-sm-12 col-xs-12'

export default function CitySearch({ modal, closeSearch }) {
   const dispatch = useDispatch()
   const country = useSelector(store => store.country)
   const state = useSelector(store => store.state)
   const { register, handleSubmit, reset } = useForm();
   const [states, setStates] = useState([])

   useEffect(() => {
      dispatch(countryActions.listAll())
   }, [dispatch])


   const getStates = async (country_id) => {
      const res = await dispatch(stateActions.filter({ country_id: country_id }))
      if (res?.success) {
         setStates(res.values)
      }
   }

   const onSubmit = async (values) => {
      const params = {
         name: values.name !== '' ? values.name : undefined,
         code: values.code !== '' ? values.code : undefined,
         country_id: values.country_id !== '' ? values.country_id : undefined,
         state_id: values.state_id !== '' ? values.state_id : undefined,
         status: values.status !== '' ? values.status : undefined
      }

      await dispatch(cityActions.list(params))
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
                        <CLabel htmlFor="country_id">Country</CLabel>
                     </div>
                     <div className={colInput}>
                        <Select
                           name='country_id'
                           data={country.listAll}
                           fields={['id', 'name']}
                           onChange={getStates}
                           register={register}
                        />
                     </div>
                  </CFormGroup>
                  <CFormGroup row>
                     <div className={colLabel}>
                        <CLabel htmlFor="state_id">State</CLabel>
                     </div>
                     <div className={colInput}>
                        <Select
                           name='state_id'
                           data={states}
                           fields={['id', 'name']}
                           setLoading={true} 
                           loading={state.filterLoading} 
                           register={register}
                        />
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
                           fields={['value', 'name']}
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