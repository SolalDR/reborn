export default {
  slug: "house",
  category: "satisfaction",
  color: "#FF0000",
  name: "Logement",
  states: {
    creation: {
      duration: 1000,
      enterModifiers: [
        {
          name: 'pollution',
          value: 1
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
          name: 'pollution',
          value: 1
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

