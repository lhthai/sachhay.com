import { buildSchema } from 'graphql'

export default buildSchema(`     
    type Category {
        id: ID!
        name: String!
        description: String!
        category_url: String!
        count: Int!
        books: [Book!]
    }

    type Book {
        id: ID!
        title: String!
        author: String!
        thumbnail: String!
        views: Int
        category: Category!
        book_url: String!
        download_epub: String
        download_mobi: String
        download_pdf: String
    }  

    input CategoryInput {
        name: String!
        description: String!        
    }

    input BookInput {
        title: String!
        author: String!
        thumbnail: String!
        category: ID!
    }

    type RootQuery {
        categories: [Category]
        categoryByCategoryUrl(category_url: String!, page: Int!): Category
        books: [Book]
        bookByBookUrl(book_url: String!): Book
        searchBooks(query: String!, page: Int!): [Book]
    }

    type RootMutation {
        addCategory (categoryInput: CategoryInput): Category
        updateCategory (id: ID!, name: String, description: String): Category
        removeCategory (id: ID!): Category
        addBook(bookInput: BookInput): Book
        updateBook (id: ID!, title: String, author: String, thumbnail: String, category: ID): Book
        removeBook (id: ID!): Book
        crawlBooks(url: String!, category: ID!): [Book]
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)