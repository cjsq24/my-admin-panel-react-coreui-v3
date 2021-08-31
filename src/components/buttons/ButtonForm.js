import { useHistory } from 'react-router-dom';

export default function ButtonForm({loading, action, url}) {
   const history = useHistory()

   const cancel = () => {
      history.push(`/${url}`)
   }

   return (
      <div className="d-flex justify-content-end">
         <button type="button" className="btn btn-danger" onClick={cancel} disabled={loading ? true : false}>Cancel</button>
         <button type="submit" className="btn btn-success ml-2" disabled={loading ? true : false}>
            {(action === 'create') ? 'Create' : 'Update'}
         </button>
      </div>
   );
}