export default {
  slug: "intensivelivestock",
  category: "alimentation",
  name: "Élevage intensif",
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -4000,
          checkConstraint: true
        }
      ]
    },
    mounted: {
      recurModifiers: [
        {
          name: 'alimentation',
          value: 1
        },
      ]
    },
  }
}

