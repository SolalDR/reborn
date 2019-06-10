import sounds from './sounds';

export default {
  name: 'global',
  groups: [
    {
      name: 'sounds',
      base: '/sounds/',
      files: [
        ...sounds,
      ],
    },
    {
      name: 'images',
      files: [
        {
          name: 'wave_line',
          path: '/svg/wave_line.svg',
        },
        {
          name: 'straight_line',
          path: '/svg/straight_line.svg',
        },
        {
          name: 'smoke_line',
          path: '/svg/smoke_line.svg',
        },
        {
          name: 'bird_map',
          path: '/img/bird_map.jpg',
        },
        {
          name: 'bird_alpha',
          path: '/img/bird_alpha.jpg',
        },
      ],
    },
  ],
};
