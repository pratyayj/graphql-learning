const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

// GraphQL schema
// IMPT: schema here does not have to match how data is stored!
// note: ! indicates that the field is compulsory

// Address does not need an id field becuase it is not saved into
// its own data structure in the server
const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`

// defines how GraphQL queries are responded to
// corresponds to the queries defined in the schema above
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons;
      }

      const byPhone = (person) =>
      args.phone === 'YES' ? person.phone : !person.phone
      return persons.filter(byPhone)

    },
    // args are the parameters of the query
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  },

  // operations that cause a change
  Mutation: {
    addPerson: (root, args) => {
      // ensure unique name
      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name
        })
      }

      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    },
    editNumber: (root, args) => {
      const person = persons.find((person) => person.name === args.name);
      if (!person) {
        return null
      }

      const updatedPerson = { ...person, phone: args.phone };
      // find person with the name in question and replace with updated
      persons = persons.map(person => person.name === args.name ? updatedPerson : person);
      return updatedPerson;
    }
  },

  // necessary to define resolvers for each field of each type in the schema
  // when there is no resolver defined, a default resolver that 
  // returns the value of the corresponding field of the object is used
  // --> object is accessed through first parameter: root

  // for example, the following resolver overrides the default
  // resulting in the address always being returned as static values
  // root here refers to the Person object
  Person: {
    address: (root) => {
      return {
        street: "Pfefferburg St",
        city: "Dublin"
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})