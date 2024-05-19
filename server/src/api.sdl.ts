import gql from 'graphql-tag'

export default gql`

  enum LogoStyle {
    Minimalistic
    NaturalElegance
    PowerAndStrength
    HarmoniousIntegration
    FuturisticVibes
    CommunityUnity
    ConnectedWorld
    TranquilityAndSerenity
  }

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
    logoStyle: LogoStyle!
    color: String!
    companyName: String!
    companyDescription: String
    customPrompt: String
  }

  type Mutation {
    generateLogo(input: GenerateLogoInput!): Logo!
  }
`
