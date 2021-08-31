import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import countryActions from '../../redux/country/action'
import CountryForm from './Form';
import CardSimple from '../../components/cards/CardSimple';

export default function CountryCreate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const { register, handleSubmit, formState: {errors} } = useForm();

   const onSubmit = async (values) => {
      const res = await dispatch(countryActions.create(values))
      if (res.success) {
         history.push('/countries')
      }
   }

   return (
      <CardSimple title='Create Country'>
         <CountryForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='create'
         />
      </CardSimple>
   );
}