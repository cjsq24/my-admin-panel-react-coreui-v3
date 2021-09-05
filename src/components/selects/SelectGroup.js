import { CButton } from '@coreui/react';
import ErrorMsgInput from '../ErrorMsgInput';

export default function SelectGroup({name, register, validations, setLoading, loading, fields, data, errors, onClick, onChange}) {
   return (
      <>
         <div className="input-group">
            <select 
               className={`form-control ${(errors && errors[name]) ? 'is-invalid-custom' : ''}`} 
               {...register(name, validations[name])} 
               onChange={(e) => onChange ? onChange(e.target.value) : null}
            >
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
         {errors &&
            <ErrorMsgInput>
               {errors && errors[name] && errors[name].message &&
                  errors[name].message
               }
            </ErrorMsgInput>
         }
      </>
   );
}