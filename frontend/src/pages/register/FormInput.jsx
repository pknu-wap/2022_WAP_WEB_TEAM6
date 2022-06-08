import React , {useState}from 'react'
import './register.css'
const FormInput = (props) => {
  const {id, name ,label, placeholder, type, errorMessage, pattern, onChange, required} = props;
  const [focused , setFocused] = useState(false);

  const handleFocus = () =>{
    setFocused(true);
  }

  return (
    <>
      <div className="registerInput">
      <label htmlFor={name}>{label}</label>
      <input 
      id = {id}
      name = {name}
      placeholder = {placeholder}
      type = {type}
      pattern ={pattern}
      onChange={onChange}
      required={required}
      className="registerInput"
      focused ={focused.toString()}
      onBlur ={handleFocus}
      />
      <span className="errMsg">{errorMessage}</span>    
      </div>
    
    
    </>
   
    
  )
}

export default FormInput