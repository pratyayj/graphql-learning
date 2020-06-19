import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const BookView = () => {

  const allBooksResult = useQuery(ALL_BOOKS);

  if (allBooksResult.loading) {
    return <p>please wait</p>
  }

  return (
    <div>
      <h2>Books</h2>
      <table>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Published</th>
        </tr>
        {allBooksResult.data.allBooks.map(b =>
          <tr>
            <td>{b.title}</td>
            <td>{b.author}</td>
            <td>{b.published}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default BookView;