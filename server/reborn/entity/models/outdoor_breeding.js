export default {
  slug: 'outdoor_breeding',
  category: 'alimentation',
  name: 'Outdoor Breeding',
  displayName: 'Elevage extérieur',
  role: 'city',
  size: [2, 3],
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
          value: 1.4,
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
      leaveModifiers: [
        {
          name: 'satisfaction',
          value: -0.7,
        },
      ],
    },
    living: {
      enterModifiers: [
        {
          name: 'waste',
          value: 0.5,
        },
      ],
      leaveModifiers: [
        {
          name: 'waste',
          value: -0.5,
        },
      ],
    },
  },
};
