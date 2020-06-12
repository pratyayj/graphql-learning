import { gql } from '@apollo/client';

const ALL_PERSONS = gql`
  query {
    allPersons  {
      name
      phone
      id
    }
  }
`

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone 
      address {
          street
          city
      }
    }
  }
`

export {
    ALL_PERSONS,
    FIND_PERSON
}