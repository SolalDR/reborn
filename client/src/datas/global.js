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
          name: 'cloud_line',
          path: '/svg/cloud_line.svg',
        },
        {
          name: 'craft_line',
          path: '/svg/craft_line.svg',
        },
        {
          name: 'straight_line',
          path: '/svg/straight_line.svg',
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
          name: 'cloud_brush',
          path: '/img/cloud_brush.png',
        },
      ],
    },
  ],
};
