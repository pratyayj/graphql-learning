import React from 'react';

// this is the component that displays the error message
const Notify = ( {errorMessage} ) => {
    if (!errorMessage) {
      return null
    }
  
    return (
      <div style={{color: 'red'}}>
        {errorMessage}
      </div>
    )
}

export default Notify;