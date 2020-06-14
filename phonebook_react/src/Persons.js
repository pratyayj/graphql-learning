import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FIND_PERSON } from './queries';

// persons is the prop that is taken in
const Persons = ({ persons }) => {
  // query event handler is getPerson and the response is stored in result
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  
  // initial state is null
  // returns state object and setPerson updates the state
  // helps to add states to this functional stateless component
  const [person, setPerson] = useState(null)
  
  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } })
  }
  
  // called when the component is assembled and updated
  // executes the function inside it
  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
    // optional second parameter that instructs this query
    // to be executed again if another person is selected
  }, [result])
  
  if (person) {
    return(
    <div>
      <h2>{person.name}</h2>
      <div>{person.address.street} {person.address.city}</div>
      <div>{person.phone}</div>
      <button onClick={() => setPerson(null)}>close</button>
    </div>
    )
  }
  
  return (
    <div>
    <h2>Persons</h2>
      {persons.map(p =>
      <div key={p.name}>
      {p.name} {p.phone}
      <button onClick={() => showPerson(p.name)} >
          show address
      </button> 
      </div>  
      )}
    </div>
  )
}

export default Persons;