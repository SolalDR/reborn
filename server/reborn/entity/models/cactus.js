export default {
  slug: "cactus",
  category: "plant",
  color: "#00FF00",
  name: "Cactus",
  displayName: "Cactus",
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
          value: 0.3
        },
      ]
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 75
        }
      ]
    }
  }
}
