import { useSelector } from 'react-redux';
import { CForm, CFormGroup, CCol, CLabel } from '@coreui/react';
import InputT from '../../components/inputs/InputT'
import ButtonForm from '../../components/buttons/ButtonForm'
import SelectGroup from '../../components/selects/SelectGroup'

import validations from "./validations";

const colLabel = 'col-md-2 offset-md-1 offset-sm-1 col-xs-12'
const colInput = 'col-md-6 col-sm-9 col-xs-12'

export default function UserForm(props) {
   const user = useSelector(store => store.user)
   const role = useSelector(store => store.role)

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
               <CLabel htmlFor="last_name">Last Name</CLabel>
            </CCol>
            <CCol className={colInput}>
               <InputT name='last_name' placeholder='Enter last name' register={props.register} validation={validations} errors={props.errors} />
            </CCol>
         </CFormGroup>
         <CFormGroup row>
            <CCol className={colLabel}>
               <CLabel htmlFor="email">Email</CLabel>
            </CCol>
            <CCol className={colInput}>
               <InputT name='email' placeholder='Enter email' register={props.register} validation={validations} errors={props.errors} />
            </CCol>
         </CFormGroup>
         <CFormGroup row>
            <CCol className={colLabel}>
               <CLabel htmlFor="role_id">Role</CLabel>
            </CCol>
            <CCol className={colInput}>
               <SelectGroup 
                  name='role_id' 
                  data={role.list} 
                  setLoading={true} 
                  loading={role.listLoading} 
                  fields={{value: 'id', string: 'name'}}
                  register={props.register} 
                  validations={validations} 
                  errors={props.errors}
               />
            </CCol>
         </CFormGroup>
         <CFormGroup row>
            <CCol xs='12' md='9'>
               <ButtonForm loading={user.loading} action={props.action} url='users' />
            </CCol>
         </CFormGroup>
      </CForm>
   );
}