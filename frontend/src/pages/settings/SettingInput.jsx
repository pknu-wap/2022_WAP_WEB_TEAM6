import React , {useState} from 'react'

function SettingInput(props) {
    const {id, name ,label, type, errorMessage, pattern, onChange, value} = props;

    const [focused , setFocused] = useState(false);

    const handleFocus = () =>{
      setFocused(true);
    }
  return (
    <div>
        <div className="registerInput">
        <label htmlFor={name}>{label}</label>
        <input 
        id = {id}
        name = {name}
        type = {type}
        value = {value}
        pattern ={pattern}
        onChange={onChange}
        className="registerInput"
        focused ={focused.toString()}
        onBlur ={handleFocus}
        />
        <span className="errMsg">{errorMessage}</span>    
        </div>
    </div>
  )
}

export default SettingInput