import { useSelector, useDispatch } from 'react-redux';
import { CForm, CFormGroup, CCol, CLabel } from '@coreui/react';
import InputT from '../../components/inputs/InputT'
import ButtonForm from '../../components/buttons/ButtonForm'
import SelectGroup from '../../components/selects/SelectGroup'

import validations from './validations';
import stateActions from '../../redux/state/action'

const colLabel = 'col-md-1 offset-md-2'
const colInput = 'col-xs-12 col-md-6'

export default function CityForm(props) {
   const dispatch = useDispatch()
   const city = useSelector(store => store.city)
   const state = useSelector(store => store.state)
   const country = useSelector(store => store.country)

   const getStates = async (country_id) => {
      dispatch(stateActions.filter({ country_id: country_id }))
   }

   return (
      <CForm onSubmit={props.handleSubmit(props.onSubmit)} autoComplete={'off'}>
         <CFormGroup row>
            <CCol className={colLabel}>
               <CLabel htmlFor="name">Name</CLabel>
            </CCol>
            <CCol className={colInput}>
               <InputT name='name' placeholder='Enter name' register={props.register} validation={validations} errors={props.errors} />
            </CCol>
         </CFormGroup>
         <CFormGroup row>
            <CCol className={colLabel}>
               <CLabel htmlFor="code">Code</CLabel>
            </CCol>
            <CCol className={colInput}>
               <InputT name='code' placeholder='Enter code' register={props.register} validation={validations} errors={props.errors} />
            </CCol>
         </CFormGroup>
         <CFormGroup row>
            <CCol className={colLabel}>
               <CLabel htmlFor="country_id">Country</CLabel>
            </CCol>
            <CCol className={colInput}>
               <SelectGroup 
                  name='country_id' 
                  data={country.list} 
                  setLoading={true} 
                  loading={country.listLoading} 
                  fields={{value: 'id', string: 'name'}}
                  register={props.register} 
                  validations={validations} 
                  errors={props.errors}
                  onChange={getStates}
               />
            </CCol>
         </CFormGroup>
         <CFormGroup row>
            <CCol className={colLabel}>
               <CLabel htmlFor="state_id">State</CLabel>
            </CCol>
            <CCol className={colInput}>
               <SelectGroup 
                  name='state_id' 
                  data={state.filter} 
                  setLoading={true} 
                  loading={state.filterLoading} 
                  fields={{value: 'id', string: 'name'}}
                  register={props.register} 
                  validations={validations} 
                  errors={props.errors}
               />
            </CCol>
         </CFormGroup>
         <CFormGroup row>
            <CCol xs='12' md='9'>
               <ButtonForm loading={city.loading} action={props.action} url='cities' />
            </CCol>
         </CFormGroup>
      </CForm>
   );
}