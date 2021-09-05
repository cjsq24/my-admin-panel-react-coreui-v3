import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { CForm, CFormGroup, CCol, CRow, CButton } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import useLocalStorage from '../../helpers/useLocalStorage';

import InputT from '../../components/inputs/InputT'
import Label from '../../components/labels/Label'

import userActions from '../../redux/user/action'
import CardSimple from '../../components/cards/CardSimple';

import validations from "./validations";
import useAuth from '../../auth/useAuth';
import { useState } from 'react';

const col = 'col-md-6 col-sm-6 col-xs-12'

export default function UserCreate() {
   const dispatch = useDispatch()
   //const [userLocal, setUserLocal] = useLocalStorage('cs_user')
   const user = useSelector(store => store.user)
   const { register, handleSubmit, setValue, formState: { errors } } = useForm();
   const {user: userLocal, updateUserInfo, login} = useAuth()

   const [userL, setUserL] = useState()

   useEffect(() => {
      const getUserLocal = async () => {
         setUserL(JSON.parse(await window.localStorage.getItem('cs_user')))
       }
       getUserLocal()

      setValue('name', userLocal?.name)
      setValue('last_name', userLocal?.last_name)
      setValue('email', userLocal?.email)
      setValue('role', userLocal?.role.name)

      console.log(userLocal)
   }, [login]);

   const onSubmit = async (values) => {
         //await window.localStorage.setItem('cs_user', JSON.stringify(user))
         updateUserInfo('asdfasdf')
      const res = await dispatch(userActions.updateProfile({
         name: values.name,
         last_name: values.last_name,
         email: values.email
      }))

      if (res.success) {
         const user = userLocal
         user.name = values.name
         user.last_name = values.last_name
         user.email = values.email
         //await window.localStorage.setItem('cs_user', JSON.stringify(user))
         updateUserInfo(user)
         
         //setUserLocal(user)
      }
   }

   return (
      <CardSimple title='Profile'>
         <p>{userL?.name}</p>
         <CRow className='justify-content-center'>
            <CCol md='8' sm='12' xs='12'>
               <CForm onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                  <CFormGroup row>
                     <div className={col}>
                        <Label title='Name' id='name' validations={validations} />
                        <InputT name='name' register={register} validation={validations} errors={errors} />
                     </div>
                     <div className={col}>
                        <Label title='Last Name' id='last_name' validations={validations} />
                        <InputT name='last_name' register={register} validation={validations} errors={errors} />
                     </div>
                  </CFormGroup>
                  <CFormGroup row>
                     <div className={col}>
                        <Label title='Email' id='email' validations={validations} />
                        <InputT name='email' register={register} validation={validations} errors={errors} />
                     </div>
                     <div className={col}>
                        <Label title='Role' id='role' />
                        <InputT name='role' register={register} disabled />
                     </div>
                  </CFormGroup>
                  <CFormGroup row>
                     <CCol md='12' sm='12' xs='12'>
                        <CButton type='submit' size='md' color='info' className='float-right' disabled={user.loading}>
                           <FontAwesomeIcon icon={faEdit} />{' '}
                           Update
                        </CButton>
                     </CCol>
                  </CFormGroup>
               </CForm>
            </CCol>
         </CRow>
      </CardSimple>
   );
}