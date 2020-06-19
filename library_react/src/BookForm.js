import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from './queries'

const BookForm = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState('')
  const [author, setAuthor] = useState('')
  const [genres, setGenres] = useState('')

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    if (title === '' || author === '' || genres === ['']) {
      setError('Fields cannnot be empty'); return;
    }

    var publishedParsed = parseInt(published);
    var splitGenres = genres.split(',');

    createBook({  variables: { title: title, published: publishedParsed,
        author: author, genres: splitGenres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          title <input value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          published <input value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          author <input value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          genres <input value={genres}
            onChange={({ target }) => setGenres(target.value)}
          />
          <p>separate genres by comma</p>
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default BookForm;