export default {
  slug: 'outdoor_breeding',
  category: 'alimentation',
  name: 'Outdoor Breeding',
  displayName: 'Elevage extérieur',
  role: 'city',
  size: [3, 2],
  states: {
    creation: {
      enterModifiers: [
        {
          name: 'money',
          value: -4000,
          checkConstraint: true,
        },
        {
          name: 'satisfaction',
          value: 0.4,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'food',
          value: 3,
        },
      ],
    },
    destruction: {
      enterModifiers: [
        {
          name: 'money',
          value: -800,
          checkConstraint: true,
        },
      ],
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 1,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -1,
        },
      ],
    },
  },
};
