//sample dataset. We will fetch data from these array of objects
const authors = [
    { id: "A1", name: "J.K. Rowling" , age:null}, 
    { id: "A2", name: "Stephen King",age : 75 },
    { id: "A3", name: "Haruki Murakami",age:74 },
    
  ];
  
  const books = [
    { id: "B1", title: "Harry Potter and the Philosopher's Stone", authorId: "A1" },
    { id: "B2", title: "The Shining", authorId: "A2" },
    { id: "B3", title: "1Q84", authorId: "A3" },
    { id: "B4", title: "The Stand", authorId: "A2" },
    { id: "B5", title: "Norwegian Wood", authorId: "A3" },
    { id: "B6", title: "The Green Mile", authorId: "A2" }
  ];


 import Author from '../models/Author.js'
 import Book from "../models/Book.js";
 
// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
    // Define resolvers for queries
    Query: {
      
      authors: async () => await Author.find({}),
      // Find an author by ID and return them
      author: async (parent, args) => await Author.findById( args.id ),

      books:async( parent, args ) => await Book.find({})
    },
    // Define resolvers for Author type fields
    Author: {
    // Return all books written by the author 
      books: (parent , args ) => {
              return Book.find( { authorId: args.authorId })
              // return books.filter(book => book.authorId === parent.id).slice( 0, args.limit )
      }
    },
    
   
  
  
    Mutation: {
      createAuthor: async (parent, args) => {

         const newAuthor = new Author( args );
         await newAuthor.save();
         return newAuthor;
     
        // const newAuthor = {
        //   id: "A"+  ( authors.length + 1 ),
        //   name: args.name,
        //   age: args.age,
        //   books: []
        // };
        // authors.push(newAuthor);
        // return newAuthor;
      },

      deleteAuthor:async ( parent, args ) =>{
        const deletedAuthor = Author.findByIdAndRemove( args.id );
        const{ ok, deletedCount } = await Book.deleteMany({ "authorId": args.id });
        if ( ok !== 1 ){
          return "No books to delete";
        }        
        return deletedAuthor;
        
      },

      createBook: async ( parent, args ) => {
      const newBook = new Book( args );
      newBook.authorId = args.authorId;
      await newBook.save();
      return newBook;      
    }
   }
    
  };
  

  //
  // casecade deletion 
  // https://dev.to/kwabenberko/implementing-sql--like-cascades-in-mongoose-bap
  // https://www.appsloveworld.com/mongodb/100/59/how-to-delete-in-cascade-in-several-models-with-mongoose