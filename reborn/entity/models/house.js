export default {
  slug: "house",
  category: "satisfaction",
  color: "#FF0000",
  name: "Logement",
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

