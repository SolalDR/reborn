export default {
  slug: "solar_panel",
  category: "energy",
  name: "Solar Panel",
  displayName: "Panneau solaire",
  role: 'city',
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -2500,
          checkConstraint: true
        },
        {
          name: 'purity',
          value: -3
        }
      ]
    },
    mounted: {
      recurModifiers: [
        {
          name: 'energy',
          value: 1.5,
        },
        {
          name: 'satisfaction',
          value: -0.2,
        },
      ]
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -500,
        },
      ]
    }
  }
}

