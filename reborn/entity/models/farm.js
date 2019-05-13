export default {
  slug: "farm",
  category: "alimentation",
  name: "Ferme",
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -6000,
          checkConstraint: true
        }
      ]
    },
    mounted: {
      recurModifiers: [
        {
          name: 'food',
          value: 10
        },
        {
          name: 'purity',
          value: -1
        }
      ]
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -2000,
          checkConstraint: true
        }
      ]
    },
  }
}

