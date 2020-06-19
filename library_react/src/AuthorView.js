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
        <tr>
          <th>Name</th>
          <th>Born</th>
          <th>Book Count</th>
        </tr>
        {allAuthorsResult.data.allAuthors.map(a =>
          <tr>
            <td>{a.name}</td>
            <td>{a.born}</td>
            <td>{a.bookCount}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default AuthorView;