import { useSelector } from 'react-redux';
import { CForm, CFormGroup, CCol, CLabel } from '@coreui/react';
import InputT from '../../components/inputs/InputT'
import ButtonForm from '../../components/buttons/ButtonForm'

import validations from "./validations";

const colLabel = 'col-md-1 offset-md-2'
const colInput = 'col-xs-12 col-md-6'

export default function MenuForm(props) {
   const menu = useSelector(store => store.menu)

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
               <CLabel htmlFor="url">Url</CLabel>
            </CCol>
            <CCol className={colInput}>
               <InputT name='url' placeholder='Enter url' register={props.register} validation={validations} errors={props.errors} />
            </CCol>
         </CFormGroup>
         <CFormGroup row>
            <CCol xs='12' md='9'>
               <ButtonForm loading={menu.loading} action={props.action} url='menus' />
            </CCol>
         </CFormGroup>
      </CForm>
   );
}