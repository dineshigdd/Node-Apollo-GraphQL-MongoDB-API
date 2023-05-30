export const typeDefs = ` 
type Author {
  id: ID!
  name: String! # returns a String and non-nullable
  books(limit: Int = 3 ): [Book!]!# A list of Books 
  age:Int
}

type Book {
  id: ID!
  title: String!
  #publicationDate: String  
  authorId:ID!
}

type Query {
  authors: [Author!]!  
}

type Mutation {
  createAuthor(name: String!, age: Int): Author!
  updateAuthor(id: ID!, name: String, age: Int): Author!  
  deleteAuthor(id: ID!): Author!
  
  createBook(title: String!, authorId:ID! ):Book!
}
`