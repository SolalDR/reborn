export default {
  slug: "farm",
  category: "alimentation",
  name: "Ferme",
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
          value: 1
        },
        {
          name: 'purity',
          value: -1
        }
      ]
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 100
        }
      ]
    }
  }
}

