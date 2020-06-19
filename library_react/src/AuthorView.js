import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from './queries';

const AuthorView = () => {

  const allAuthorsResult = useQuery(ALL_AUTHORS);

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
    </div>
  )
}

export default AuthorView;