// A schema is a collection of type definitions 

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
  author(id: ID!): Author!
  books:[Book!]!
}

type Mutation {
  createAuthor(name: String!, age: Int): Author!
  createBook(title: String!, authorId:ID! ):Book!
 #feel free to add resolvers for update and delete
 # updateAuthor(id: ID!, name: String, age: Int): Author! 
  deleteAuthor(id: ID!): Author!
}
`;