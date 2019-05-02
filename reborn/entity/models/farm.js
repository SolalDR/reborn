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
          value: -4000,
          checkConstraint: true
        }
      ]
    },
    mounted: {
      recurModifiers: [
        {
          name: 'alimentation',
          value: 3
        },
        {
          name: 'purity',
          value: -1
        }
      ]
    },
  }
}

