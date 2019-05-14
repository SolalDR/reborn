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
        },
        {
          name: 'satisfaction',
          value: 15,
        }
      ]
    },
  }
}

