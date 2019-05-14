export default {
  slug: "house",
  category: "satisfaction",
  color: "#FF0000",
  name: "House",
  displayName: "Logement",
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'purity',
          value: -1
        },
        {
          name: 'money',
          value: -200,
          checkConstraint: true
        },
        {
          name: 'satisfaction',
          value: 5,
        },
      ]
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: -0.5
        }
      ]
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: -15
        }
      ]
    }
  }
}

