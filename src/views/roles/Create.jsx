import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import roleActions from '../../redux/role/action'
import RoleForm from './Form';
import CardSimple from '../../components/cards/CardSimple';

export default function RoleCreate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const { register, handleSubmit, formState: {errors} } = useForm();

   const onSubmit = async (values, modules) => {
      const res = await dispatch(roleActions.create({...values, modules}))

      if (res.success) {
         history.push('/roles')
      }
   }

   return (
      <CardSimple title='Create Role'>
         <RoleForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='create'
         />
      </CardSimple>
   );
}