import React, { useState, useEffect } from 'react';
import './App.css';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_PERSONS, FIND_PERSON } from './queries';
import './PersonForm';
import PersonForm from './PersonForm';
import Notify from './Notify';
import Persons from './Persons';

function App() {
  // useQuery is the primary API for executing queries
  // --> useful for when query is done when compoinent is rendered
  // returns an object from Apollo Client that contains: loading, error and data
  const allPersonsResult = useQuery(ALL_PERSONS, {
    // sets to poll every 2s but creates unnecessary overhead
    // pollInterval: 2000
  });

  // create error state for functional stateless component
  const [errorMessage, setErrorMessage] = useState(null)

  if (allPersonsResult.loading) {
    return <div>loading...</div>
  }

  // this function is passed to PersonForm
  // which gives it the message of the error that it receives
  // and then sets its error message in the state
  // and the timeout after which it is set to null again
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (allPersonsResult.error) {
    return <div>there was an error.</div>
  }

  return (
    <div className="App">
      <Notify errorMessage={errorMessage}></Notify>
      <Persons persons={allPersonsResult.data.allPersons}></Persons>
      <PersonForm setError={notify}></PersonForm>
    </div>
  );
}

export default App;
