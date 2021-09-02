import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import stateActions from '../../redux/state/action'
import countryActions from '../../redux/country/action'
import StateForm from './Form';
import CardSimple from '../../components/cards/CardSimple';

export default function StateUpdate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()
   const { data } = location.state || {}
   const { register, handleSubmit, formState: {errors}, setValue } = useForm({ defaultValues: data ? data : {} });

   useEffect(() => {
      if (!data) {
         history.push('/states')
      }
      const getCountries = async () => {
         await dispatch(countryActions.list())
         setValue('country_id', data?.country_id)
      }
      getCountries() //Llenamos el select de países y seteamos country_id si estamos actualizando
   }, [dispatch]);

   const onSubmit = async (values) => {
      const res = await dispatch(stateActions.update({...values, id: data.id}))
      if (res.success) {
         history.push('/states')
      }
   }

   return (
      <CardSimple title='Update State'>
         <StateForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='update'
            data={data}
            setValue={setValue}
         />
      </CardSimple>
   );
}