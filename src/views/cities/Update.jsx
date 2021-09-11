import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import cityActions from '../../redux/city/action'
import countryActions from '../../redux/country/action'
import stateActions from '../../redux/state/action'
import CityForm from './Form';
import CardSimple from '../../components/cards/CardSimple';

export default function CityUpdate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()
   const { data } = location.state || {}
   const { register, handleSubmit, formState: {errors}, setValue } = useForm({ defaultValues: data ? data : {} });

   useEffect(() => {
      if (!data) {
         history.push('/cities')
      }
      const getSetSelect = async () => {
         await dispatch(countryActions.list())
         await dispatch(stateActions.listByCountry({country_id: data?.state.country_id}))
         
         setValue('country_id', data?.state.country_id)
         setValue('state_id', data?.state.id)
      }
      getSetSelect()
   }, [dispatch]);

   const onSubmit = async (values) => {
      const res = await dispatch(cityActions.update({...values, id: data.id}))
      if (res.success) {
         history.push('/cities')
      }
   }

   return (
      <CardSimple title='Update City'>
         <CityForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='update'
            data={data}
         />
      </CardSimple>
   );
}