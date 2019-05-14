export default {
  slug: "big_flower",
  category: "plant",
  color: "#00FF00",
  name: "Big Flower",
  displayName: "Grande Fleur",
  role: "nature",
  states: {
    creation: {
      duration: 500,
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
          value: 100
        }
      ]
    }
  }
}

