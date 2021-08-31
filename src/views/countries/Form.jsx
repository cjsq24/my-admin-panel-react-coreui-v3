import { useSelector } from 'react-redux';
import { CForm, CFormGroup, CCol, CLabel } from '@coreui/react';
import InputT from '../../components/inputs/InputT'
import ButtonForm from '../../components/buttons/ButtonForm'

import validations from "./validations";

const colLabel = 'col-md-1 offset-md-2'
const colInput = 'col-xs-12 col-md-6'

export default function CountryForm(props) {
   const country = useSelector(store => store.country)

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
            <CCol xs='12' md='9'>
               <ButtonForm loading={country.loading} action={props.action} url='countries' />
            </CCol>
         </CFormGroup>
      </CForm>
   );
}