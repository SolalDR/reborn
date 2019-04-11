export default {
  slug: "tree",
  category: "vegegation",
  color: "#00FF00",
  name: "Arbre",
  states: {
    creation: {
      duration: 1000,
      enterModifiers: [
        {
          name: 'pollution',
          value: -1
        }
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'pollution',
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

