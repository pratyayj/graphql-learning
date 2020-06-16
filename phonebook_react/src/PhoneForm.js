import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_NUMBER, ALL_PERSONS } from './queries'

// because the person has an identifying type field ID, the cache can
// update the phone number field automatically when the mutation is called
const PhoneForm = ({ notify }) => {
  // create the state in store for functional stateless component
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  // uses the mutation hook to execute the mutation
  const [ changeNumber, result ] = useMutation(EDIT_NUMBER)

  const submit = async (event) => {
    event.preventDefault()

    // the variables of name and phone are passed in
    changeNumber({ variables: { name, phone } })

    setName('')
    setPhone('')
  }

  // when there is a result.data field change, this effect runs
  // to check if there is a null response (which is not an error to GraphQL)
  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      notify('person not found')
    }
  }, [result.data]) // eslint ought to throw a warning here
  // this is as a result of 'notify' not beiung a part of the dependency array
  // simply including it in the array results in another issue
  // which is that when the notification is removed after the 10s
  // and the App component is re-rendered, a new version of 'notify'
  // gets created which results in an endless loop of this effect being called.
  // the solution is to wrap the 'notify' function in a useCallback function
  
  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>change number</button>
      </form>
    </div>
  )
}

export default PhoneForm