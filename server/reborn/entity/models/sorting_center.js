export default {
  slug: "sorting_center",
  category: "recycling",
  color: "#00FF00",
  name: "Sorting Center",
  displayName: "Centre de tri",
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
