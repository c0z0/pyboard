import shortid from 'shortid'

import mockscalar from '../mockscalar'

const experiments = [{ name: 'Example', id: '1' }]
const scalars = [mockscalar]

export default {
	Query: {
		allExperiments: () => experiments,
		experiment: (_, { id }) => experiments.find(i => i.id == id)
	},
	Mutation: {
		createExperiment: (_, { name }) => {
			const newExperiment = { name, id: shortid.generate() }
			experiments.push(newExperiment)
			return newExperiment
		},
		createScalar: (_, { name, experimentId }) => {
			if (scalars.find(s => s.experimentId === experimentId && s.name === name))
				throw new Error('Name must be unique')
			const newScalar = {
				name,
				experimentId,
				values: [],
				times: [],
				id: shortid.generate()
			}
			scalars.push(newScalar)
			return newScalar
		},
		getAndResetScalar: (_, { name, experimentId }) => {
			const scalar = scalars.find(
				s => s.experimentId === experimentId && s.name === name
			)

			scalar.values = []
			scalar.times = []

			return scalar
		},
		addScalarValue: (_, { scalarId, value, time }) => {
			const scalar = scalars.find(s => s.id === scalarId)
			scalar.values.push(value)
			scalar.times.push(time)
			return scalar
		},
		addMultipleScalarValues: (_, { scalarId, values, times }) => {
			const scalar = scalars.find(s => s.id === scalarId)
			scalar.values.push(...values)
			scalar.times.push(...times)
			return scalar
		}
	},
	Experiment: {
		scalars: ({ id }) => scalars.filter(i => i.experimentId === id)
	},
	Scalar: {
		experiment: ({ experimentId }) =>
			experiments.find(i => i.id === experimentId)
	}
}
