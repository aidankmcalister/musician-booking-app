export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    avatar: String
    instrumentsPlayed: [String]
    listingsCreated: [GigListing]
    listingsAttending: [GigListing]
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user: User @requireAuth
  }

  input CreateUserInput {
    name: String
    email: String!
    avatar: String
    instrumentsPlayed: [String]
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    name: String
    email: String
    avatar: String
    instrumentsPlayed: [String]
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
    attendListing(listingId: String!): GigListing! @requireAuth
  }
`
