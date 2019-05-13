export default {
  slug: "factory",
  category: "energy",
  name: "Usine",
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -10000,
          checkConstraint: true
        }
      ]
    },
    mounted: {
      recurModifiers: [
        {
          name: 'energy',
          value: 10
        },
        {
          name: 'purity',
          value: -2
        }
      ]
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 3000
        }
      ]
    }
  }
}

