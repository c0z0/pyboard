import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

const gql = a => a

const typeDefs = gql`
	scalar Time

	type Scalar {
		name: String!
		experiment: Experiment!
		id: ID!
		values: [Float]!
		times: [Time]!
	}

	type Experiment {
		name: String!
		id: ID!
		scalars: [Scalar]!
	}

	type Query {
		allExperiments: [Experiment]!
		experiment(id: ID!): Experiment!
	}

	type Mutation {
		createExperiment(name: String!): Experiment!
		createScalar(name: String!, experimentId: ID!): Scalar!
		addScalarValue(scalarId: ID!, value: Float!, time: Time!): Scalar!
		addMultipleScalarValues(
			scalarId: ID!
			values: [Float]!
			times: [Time]!
		): Scalar!
		getAndResetScalar(name: String!, experimentId: ID!): Scalar!
	}
`

export default makeExecutableSchema({ typeDefs, resolvers })
