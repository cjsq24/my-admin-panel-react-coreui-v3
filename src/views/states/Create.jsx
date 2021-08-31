import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import stateActions from '../../redux/state/action'
import countryActions from '../../redux/country/action'
import StateForm from './Form';
import CardSimple from '../../components/cards/CardSimple';

export default function StateCreate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const { register, handleSubmit, formState: {errors} } = useForm();

   useEffect(() => {
      dispatch(countryActions.list())
   }, [dispatch]);

   const onSubmit = async (values) => {
      const res = await dispatch(stateActions.create(values))
      if (res.success) {
         history.push('/states')
      }
   }

   return (
      <CardSimple title='Create State'>
         <StateForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='create'
         />
      </CardSimple>
   );
}