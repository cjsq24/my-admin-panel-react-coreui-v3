import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import userActions from '../../redux/user/action'
import UserForm from './Form';
import CardSimple from '../../components/cards/CardSimple';

export default function UserCreate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const { register, handleSubmit, formState: {errors} } = useForm();

   const onSubmit = async (values) => {
      const res = await dispatch(userActions.create(values))
      if (res.success) {
         history.push('/users')
      }
   }

   return (
      <CardSimple title='User Create'>
         <UserForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='create'
         />
      </CardSimple>
   );
}