export default {
  slug: "flower",
  category: "plant",
  color: "#00FF00",
  name: "Fleur",
  role: "nature",
  states: {
    creation: {
      duration: 200,
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
        },
      ]
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 50
        }
      ]
    }
  }
}

