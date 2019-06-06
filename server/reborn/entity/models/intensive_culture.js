export default {
  slug: "intensive_culture",
  category: "alimentation",
  name: "Culture intensive",
  role: 'city',
  size: [3, 2],
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -6000,
          checkConstraint: true
        },
        {
          name: 'biodiversity',
          value: -5,
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
          value: -12
        },
      ]
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: -2000
        },
        {
          name: 'biodiversity',
          value: 5,
        }
      ]
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 0.05
        }
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -0.05
        }
      ]
    }
  }
}

