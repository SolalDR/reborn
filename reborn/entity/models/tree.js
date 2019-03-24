export default {
  slug: "tree",
  name: "Arbre",
  states: {
    creation: {
      duration: 0.5,
      enterModifiers: [
        {
          name: 'pollution',
          value: -0.2
        }
      ]
    },
    mounted: {
      recurModifiers: [
        {
          name: 'pollution',
          value: -0.1
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

