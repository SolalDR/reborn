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
          value: -2000,
          checkConstraint: true
        }
      ]
    },
    mounted: {
      recurModifiers: [
        {
          name: 'satisfaction',
          value: 1
        },
      ]
    },
  }
}

