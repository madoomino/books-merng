import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import { books as BOOKS, authors as AUTHORS } from "../data/dummy.js";

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: (book) => AUTHORS.find((author) => author.id == book.authorId),
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => BOOKS.filter((book) => book.authorId == author.id),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => BOOKS.find((book) => book.id == args.id),
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => AUTHORS.find((author) => author.id == args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => BOOKS,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => AUTHORS,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
