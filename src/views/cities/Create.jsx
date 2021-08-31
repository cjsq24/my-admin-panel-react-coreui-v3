import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import cityActions from '../../redux/city/action'
import countryActions from '../../redux/country/action'
import CityForm from './Form';
import CardSimple from '../../components/cards/CardSimple';

export default function CityCreate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const { register, handleSubmit, formState: {errors} } = useForm();

   useEffect(() => {
      dispatch(countryActions.list())
   }, [dispatch]);

   const onSubmit = async (values) => {
      const res = await dispatch(cityActions.create(values))
      if (res.success) {
         history.push('/cities')
      }
   }

   return (
      <CardSimple title='Create City'>
         <CityForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='create'
         />
      </CardSimple>
   );
}