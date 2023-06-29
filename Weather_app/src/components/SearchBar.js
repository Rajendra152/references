import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar({HandleFormSubmit,setUserInput}) {
    const [inp, setInp] = useState("")

   //GET USER INPUT CITY
   const handleUserInput = (e)=>{
    const input = e.target.value;
    setInp(input)
    setUserInput(input)
  }

  return (
    <div id="input_section">
        <form onSubmit={HandleFormSubmit}>
          <input type="text" onChange={handleUserInput} value={inp} placeholder='Please Enter City Name, US Zip Code, Canada Postal Code, UK Post Code, ip, meter, etc '/>
        </form>
    </div>
  )
}

export default SearchBar