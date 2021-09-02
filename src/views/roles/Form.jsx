import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CForm, CFormGroup, CCol, CLabel, CRow, CButton } from '@coreui/react';
import InputT from '../../components/inputs/InputT'
import ButtonForm from '../../components/buttons/ButtonForm'

import menuActions from '../../redux/menu/action'
import validations from "./validations";

const colLabel = 'col-md-2 offset-md-1'
const colInput = 'col-xs-12 col-md-6'

export default function RoleForm(props) {
   const dispatch = useDispatch()
   const role = useSelector(store => store.role)
   const menu = useSelector(store => store.menu)
   const [selectedMenus, setSelectedMenus] = useState(props.data?.modules ? props.data.modules : [])

   useEffect(() => {
      dispatch(menuActions.list())
   }, [dispatch]);

   useEffect(() => {
      props.register('modules', {
         validate: () => Array.isArray(selectedMenus) && selectedMenus.length > 0
      })
   }, [selectedMenus])
   
   const selectMenu = (url) => {
      const modules = selectedMenus
      modules.push(url)
      setSelectedMenus([...modules])
   }

   const unSelectMenu = (url) => {
      const modules = selectedMenus
      for (let i = 0; i < modules.length; i ++) {
         if (modules[i] === url) {
            modules.splice(i, 1);
         }
      }
      setSelectedMenus([...modules])
   }

   const checkMenu = (url) => {
      return selectedMenus.includes(url)
   }

   return (
      <CForm onSubmit={props.handleSubmit((values) => props.onSubmit(values, selectedMenus))} autoComplete={'off'}>
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
               <CLabel htmlFor="key_name">Key Name</CLabel>
            </CCol>
            <CCol className={colInput}>
               <InputT name='key_name' placeholder='Enter key name' register={props.register} validation={validations} errors={props.errors} />
            </CCol>
         </CFormGroup>
         <CFormGroup row>
            <CCol className={`justify-content-center`}>
               <CRow>
                  <CCol className={colLabel}>
                     <CLabel htmlFor="name">Menú List</CLabel>
                  </CCol>
               </CRow>
               <CRow className='justify-content-center'>
                  <CCol className='d-flex row justify-content-center col-md-6 align-items-center'>
                     {menu.list.map(({id, name, url}, key) => (
                        <div key={id} className='col-md-4 mb-2 d-flex justify-content-center'>
                           <CButton
                              color={'info'}
                              variant={`${checkMenu(url) ? '' : 'outline'}`}
                              onClick={() => checkMenu(url) ? unSelectMenu(url) : selectMenu(url)}
                              >
                              {name}
                           </CButton>
                        </div>
                     ))}
                  </CCol>
               </CRow>
               <CRow className={'justify-content-center col-md-8'}>
                  <span>{props.errors?.modules && <span className='text-danger'>Select Menus</span>}</span>
               </CRow>
            </CCol>
         </CFormGroup>
         <CFormGroup row>
            <CCol xs='12' md='9'>
               <ButtonForm loading={role.loading} action={props.action} url='roles' />
            </CCol>
         </CFormGroup>
      </CForm>
   );
}