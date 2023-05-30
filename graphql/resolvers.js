import Author from '../models/Author.js'
import Book from '../models/Book.js';
// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
    // Define resolvers for queries
    Query: {
      
      authors: async () => await Author.find({}),
      
     
    },

    Mutation: {
      createAuthor: async (parent, args) => {

         const newAuthor = new Author( args );
         return await newAuthor.save();
  
      },

      updateAuthor : async (parent, args ) => {
        
        const { id, name , age } = args; 
        await Author.findByIdAndUpdate( id, { name ,age } );
        return await Author.findById( id );

      },

      deleteAuthor:async ( parent, args ) =>{
        const deletedAuthor = Author.findByIdAndRemove( args.id );
        await Book.deleteMany({ "authorId": args.id });
        return deletedAuthor;
        
      },

      createBook: async ( parent, args ) => {
        const newBook = new Book( args );
        newBook.authorId = args.authorId;
        return await newBook.save();          
      }
      
    }
}
    
   
  
  
   