import { gql } from '@apollo/client';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $bornYear: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $bornYear
    ) {
      name
      born
    }
  }
`

export {
  ALL_AUTHORS,
  ALL_BOOKS,
  CREATE_BOOK,
  UPDATE_AUTHOR
}