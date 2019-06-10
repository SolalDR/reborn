export default {
  slug: 'centenary_tree',
  category: 'tree',
  color: '#00FF00',
  name: 'Centenary Tree',
  displayName: 'Arbre centenaire',
  role: 'nature',
  states: {
    creation: {
      duration: 2000,
      enterModifiers: [
        {
          name: 'purity',
          value: 1,
        },
      ],
    },
    mounted: {
      recurModifiers: [
        {
          name: 'purity',
          value: 1.2,
        },
      ],
    },
    destruction: {
      leaveModifiers: [
        {
          name: 'money',
          value: 750,
        },
      ],
    },
  },
};
