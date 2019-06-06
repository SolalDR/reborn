export default {
  slug: "recycling_factory",
  category: "recycling",
  color: "#00FF00",
  name: "Recycling Factory",
  displayName: "Centre de recyclage",
  role: "city",
  states: {
    creation: {
      duration: 200,
      enterModifiers: [
        {
          name: 'waste',
          value: -0.5
        }
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'waste',
          value: 0.5
        }
      ]
    }
  }
}
