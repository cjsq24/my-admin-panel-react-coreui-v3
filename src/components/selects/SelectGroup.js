import { CButton } from '@coreui/react';

export default function SelectGroup({name, register, validations, setLoading, loading, fields, data, errors, onClick, onChange}) {
   return (
      <>
         <div className="input-group">
            <select className='form-control' {...register(name, validations[name])} onChange={(e) => onChange ? onChange(e.target.value) : null}>
               {setLoading && loading ? (
                     <option value=''>Loading...</option>
                  )  :  (
                     <>
                        <option value=''>Seleccione</option>
                        {data?.length > 0 &&
                           data.map((item, key) => (
                              <option key={key} value={item[fields.value]}>{item[fields.string]}</option>
                           ))
                        }
                     </>
                  )
               }
            </select>
            <CButton color='info' variant='outline' onClick={onClick ? onClick : null}>Add</CButton>
         </div>
         <span className='text-danger'>{errors?.country_id?.message}</span>
      </>
   );
}