export default {
  slug: "tree",
  name: "Arbre",
  states: {
    creation: {
      duration: 2000,
      enterModifiers: [
        {
          name: 'pollution',
          value: 5
        }
      ],
      recurModifiers: [
        {
          name: 'pollution',
          value: 0.1
        }
      ],
      leaveModifiers: [
        {
          name: 'pollution',
          value: 5
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

