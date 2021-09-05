import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import userActions from '../../redux/user/action'
import roleActions from '../../redux/role/action'
import UserForm from './Form';
import CardSimple from '../../components/cards/CardSimple';

export default function UserUpdate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()
   const { data } = location.state || {}
   const { register, handleSubmit, formState: {errors}, setValue } = useForm({ defaultValues: data ? data : {} });

   useEffect(() => {
      if (!data) {
         history.push('/users')
      }
      const getRoles = async () => {
         await dispatch(roleActions.listAll())
         setValue('role_id', data?.role_id)
      }
      getRoles() //Llenamos el select de países y seteamos role_id si estamos actualizando
   }, [dispatch]);

   const onSubmit = async (values) => {
      const res = await dispatch(userActions.update({...values, id: data.id}))
      if (res.success) {
         history.push('/users')
      }
   }

   return (
      <CardSimple title='User Update'>
         <UserForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='update'
         />
      </CardSimple>
   );
}