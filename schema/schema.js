const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Page {
    id: String
    title: String
    body_html: String
    author: String
    published_at: String
    created_at: String
    updated_at: String
    handle: String
    # metafield: [Metafield]
    shop_id: String
    template_suffix: String
  }

  type PageCount {
    title: String
    limit: String
    page: String
    since_id: String
    created_at_min: String
    created_at_max: String
    updated_at_min: String
    updated_at_max: String
    published_at_max: String
    fields: String
    published_status: String
  }

  type Metafield {
    key: String
    value: String
    value_type: String
    namespace: String
  }

  type Query {
    getPages: [Page]
    # getOneBook(id: String!): Book
    # getBookByAuthor(author: String): [Book]
    # getBookByCategory(category: String): [Book]
  }

  #   type Mutation {
  #     addBook(
  #       bookTitle: String!
  #       author: [String]!
  #       category: [String]!
  #       content: String!
  #       image: String!
  #       link: [String]!
  #       uploader: String!
  #     ): Book
  #     updateBook(
  #       id: String!
  #       bookTitle: String
  #       author: [String]
  #       category: [String]
  #       content: String
  #       image: String!
  #       link: [String]
  #       uploader: String
  #     ): Book
  #     deleteBook(id: String!): Book
  #     updateLike(id: String!): Book
  #   }
  #
`;

module.exports = typeDefs;
