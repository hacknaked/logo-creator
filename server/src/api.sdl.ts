import gql from 'graphql-tag'

export default gql`
  type Logo {
    id: Int!
    url: String!
    prompt: String!
    score: Int
  }

  type Query {
    logos: [Logo]!
  }

  input GenerateLogoInput {
    companyName: String!
  }

  type Mutation {
    generateLogo(input: GenerateLogoInput!): Logo!
  }
`
