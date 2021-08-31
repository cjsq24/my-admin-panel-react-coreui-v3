export default function InputT({type, name, placeholder, register, validation, errors}) {
   return (
      <>
         <input 
            type={type ? type : "text" }
            id={name} 
            className="form-control" 
            placeholder={placeholder}
            {...register(name, validation[name])}
         />
         <span className='text-danger'>
            {errors && errors[name] && errors[name].message &&
               errors[name].message
            }
            {/*errors[name].message*/}
         </span>
      </>
   );
}