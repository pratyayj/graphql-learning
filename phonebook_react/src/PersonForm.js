import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { CREATE_PERSON, ALL_PERSONS} from './queries'

const PersonForm = ({ setError }) => {
  // adds state to functional stateless component which are initially '' (empty string)
  // and returns the state and respective method to assign to it
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  // mutation functions are defined with the useMutation hook
  const [ createPerson ] = useMutation(CREATE_PERSON, {
    // upon completion of the mutation, call this query
    // however if another person working on the same remote GraphQL server makes an update
    // the person here won't see a change unless a CREATE_PERSON query is made
    refetchQueries: [ { query: ALL_PERSONS }],
    onError: (error) => {
      // setError is a function error handling function passed in
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createPerson({  variables: { name, phone, street, city } })

    // upon submission set the states to empty string again
    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street <input value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city <input value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default PersonForm