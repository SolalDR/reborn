export default {
  slug: "tree",
  category: "tree",
  color: "#00FF00",
  name: "Arbre",
  role: "nature",
  states: {
    creation: {
      duration: 2000,
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
          value: 1000
        }
      ]
    }
  }
}

