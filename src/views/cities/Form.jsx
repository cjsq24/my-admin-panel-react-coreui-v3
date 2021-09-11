import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CForm, CFormGroup, CRow, CCol, CModal } from '@coreui/react';
import InputT from '../../components/inputs/InputT'
import ButtonForm from '../../components/buttons/ButtonForm'
import SelectGroup from '../../components/selects/SelectGroup'
import Label from '../../components/labels/Label'
import CountryCreate from '../countries/Create'
import StateCreate from '../states/Create'

import validations from './validations';
import stateActions from '../../redux/state/action'

const col = 'col-md-6 col-sm-6 col-xs-12'

export default function CityForm(props) {
   const dispatch = useDispatch()
   const city = useSelector(store => store.city)
   const state = useSelector(store => store.state)
   const country = useSelector(store => store.country)

   const [modalCreate, setModalCreate] = useState(false)
   const [modalForm, setModalForm] = useState('')

   const getStates = async (country_id) => {
      await dispatch(stateActions.listByCountry({ country_id: country_id }))
   }

   const closeModalCreateCountry = (country_id = null) => {
      if (country_id) {
         props.setValue('country_id', country_id)
         dispatch(stateActions.resetListBy())
      }
      setModalCreate(false)
   }

   const closeModalCreateState = async (state) => {
      if (state) {
         const { country_id } = props.getValues()
         if (country_id !== '' && country_id === state.country.id.toString()) {
            await dispatch(stateActions.listByCountry({}, state))
            props.setValue('state_id', state.id)
         } else if (country_id !== state.country.id.toString()) {
            await getStates(state.country.id)
            await props.setValue('country_id', state.country.id)
            props.setValue('state_id', state.id)
         }
      }
      setModalCreate(false)
   }

   const openModalCreate = (form) => {
      setModalForm(form)
      setModalCreate(true)
   }

   return (
      <CRow className='justify-content-center'>
         <CCol md='8' sm='12' xs='12'>
            <CForm onSubmit={props.handleSubmit(props.onSubmit)} autoComplete={'off'}>
               <CFormGroup row>
                  <div className={col}>
                     <Label title='Name' id='name' validations={validations} />
                     <InputT name='name' register={props.register} validation={validations} errors={props.errors} />
                  </div>
                  <div className={col}>
                     <Label title='Code' id='code' validations={validations} />
                     <InputT name='code' register={props.register} validation={validations} errors={props.errors} />
                  </div>
               </CFormGroup>
               <CFormGroup row>
                  <div className={col}>
                     <Label title='Latitude' id='latitude' validations={validations} />
                     <InputT name='latitude' register={props.register} validation={validations} errors={props.errors} />
                  </div>
                  <div className={col}>
                     <Label title='Longitude' id='longitude' validations={validations} />
                     <InputT name='longitude' register={props.register} validation={validations} errors={props.errors} />
                  </div>
               </CFormGroup>
               <CFormGroup row>
                  <div className={col}>
                     <Label title='Country' id='country_id' validations={validations} />
                     <SelectGroup
                        name='country_id'
                        data={country.list}
                        setLoading={true}
                        loading={country.listLoading}
                        fields={{ value: 'id', string: 'name' }}
                        onChange={getStates}
                        register={props.register}
                        validations={validations}
                        errors={props.errors}
                        onClick={() => openModalCreate('country')}
                     />
                  </div>
                  <div className={col}>
                     <Label title='State' id='state_id' validations={validations} />
                     <SelectGroup
                        name='state_id'
                        data={state.listByCountry}
                        setLoading={true}
                        loading={state.listByCountryLoading}
                        fields={{ value: 'id', string: 'name' }}
                        register={props.register}
                        validations={validations}
                        errors={props.errors}
                        onClick={() => openModalCreate('state')}
                     />
                  </div>
               </CFormGroup>
               <CFormGroup row>
                  <CCol>
                     <ButtonForm loading={city.loading} action={props.action} url='cities' />
                  </CCol>
               </CFormGroup>
            </CForm>
            <CModal show={modalCreate} onClose={() => setModalCreate(false)} size='xl'>
               {modalForm === 'country' &&
                  <CountryCreate iamModal iamModalClose={closeModalCreateCountry} />
               }
               {modalForm === 'state' &&
                  <StateCreate iamModal iamModalClose={closeModalCreateState} />
               }
            </CModal>
         </CCol>
      </CRow>
   );
}