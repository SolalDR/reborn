export default {
  slug: "nuclear_power_station",
  category: "energy",
  name: "Nuclear power station",
  displayName: "Central nucléaire",
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -10000,
          checkConstraint: true
        },
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
          value: -15,
        }
      ]
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: -3000
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

