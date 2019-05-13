export default {
  slug: "house",
  category: "satisfaction",
  color: "#FF0000",
  name: "House",
  displayName: "Logement",
  role: 'city',
  states: {
    creation: {
      duration: 1000,
      enterModifiers: [
        {
          name: 'purity',
          value: -1
        },
        {
          name: 'money',
          value: -1000,
          checkConstraint: true
        }
      ]
    },
    mounted: {
      recurModifiers: [
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

