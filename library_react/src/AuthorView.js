import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_AUTHOR } from './queries';

const AuthorView = ({ setError }) => {

  const allAuthorsResult = useQuery(ALL_AUTHORS);
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const [bornYear, setBornYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')

  const submit = async (event) => {
    event.preventDefault()

    if (bornYear === '') {
      setError('Birth year cannnot be empty'); return;
    }

    var bornYearParsed = parseInt(bornYear);
    console.log(bornYearParsed)
    console.log(selectedAuthor)

    updateAuthor({  variables: { name: selectedAuthor, bornYear: bornYearParsed }})

    setBornYear('')
  }

  if (allAuthorsResult.loading) {
    return <p>please wait</p>
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Book Count</th>
          </tr>
        </thead>
        <tbody>
          {allAuthorsResult.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Update author birth year</h3>
      <form onSubmit={submit}>
        <select
          defaultValue="default" 
          onChange={({ target }) => setSelectedAuthor(target.value)}>
          <option value="default" disabled>Choose author</option>
          {allAuthorsResult.data.allAuthors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </select>
        <div>
          year<input value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>
        <button type='submit'>update!</button>
      </form>
    </div>
  )
}

export default AuthorView;