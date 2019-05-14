export default {
  slug: "cinema",
  category: "satisfaction",
  name: "Cinema",
  displayName: "Cinéma",
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -1500,
          checkConstraint: true
        },
        {
          name: 'satisfaction',
          value: 15,
        }
      ]
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 0.0025
        }
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -0.0025
        }
      ]
    }
  }
}

