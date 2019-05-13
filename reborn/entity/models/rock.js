export default {
  slug: "rock",
  category: "rock",
  color: "#00FF00",
  name: "Roche",
  role: "nature",
  states: {
    creation: {
      duration: 750,
      enterModifiers: [
        {
          name: 'purity',
          value: 1
        }
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 1
        }
      ]
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 250
        }
      ]
    }
  }
}

