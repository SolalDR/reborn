export default {
  slug: "house",
  name: "Logement",
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'pollution',
          value: +0.5
        },
        {
          name: 'money',
          value: -1000,
          checkBefore: true
        }
      ]
    },
    mounted: {
      recurModifiers: [
        {
          name: 'pollution',
          value: 0.5
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

