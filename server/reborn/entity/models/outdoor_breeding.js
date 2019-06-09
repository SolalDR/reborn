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
          value: -8000,
          checkConstraint: true,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'food',
          value: 5,
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
