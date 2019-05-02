export default {
  slug: "flour",
  category: "plant",
  color: "#00FF00",
  name: "Fleur",
  role: "nature",
  states: {
    creation: {
      duration: 1000,
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
  }
}

