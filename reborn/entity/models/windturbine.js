export default {
  slug: "windturbine",
  category: "energy",
  name: "Éolienne",
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -1000,
          checkConstraint: true
        },
        {
          name: 'purity',
          value: -0.5
        }
      ]
    },
    mounted: {
      recurModifiers: [
        {
          name: 'energy',
          value: 0.5
        },
      ]
    },
  }
}

