import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import countryActions from '../../redux/country/action'
import CountryForm from './Form';
import CardSimple from '../../components/cards/CardSimple';

export default function CountryUpdate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()
   const { data } = location.state || {}
   const { register, handleSubmit, formState: {errors} } = useForm({
      defaultValues: {
         name: data?.name,
         code: data?.code
      }
   });

   useEffect(() => {
      if (!data) {
         history.push('/countries')
      }
   }, [dispatch]);

   const onSubmit = async (values) => {
      const res = await dispatch(countryActions.update({...values, id: data.id}))
      if (res.success) {
         history.push('/countries')
      }
   }

   return (
      <CardSimple title='Update Country'>
         <CountryForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='update'
         />
      </CardSimple>
   );
}