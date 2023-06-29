import React from 'react'
import './Error.css'

function Error(data) {
    const statusCode = data.data.err.response.status
    const ErrorMessages = ()=>{
        switch (statusCode) {
            case 400:
                return <h1>City not found with name {data.data.userInput}</h1>
            case 401:
                return <h1>You are not authorized to use this site</h1>
            default:
                return <h1>We are facing problems while fething data, please try again later</h1>
        }
    }
  return (
    <div className='error_holder'>
        {ErrorMessages()}
    </div>
  )
}

export default Error