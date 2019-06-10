import defaultTheme from './_default';

export default defaultTheme.extends({
  water: {
    color: 0x88d5d4,
    waves: 500,
  },

  map: {
    stages: [
      {
        definition: 4,
        rotation: Math.PI / 4,
        floorColor: 0x97b653,
        wallColor: 0x333333,
        radius: 10,
        noise: 0,
        height: 1,
        altitude: 0.5,
        position: {
          x: 0, y: 0,
        },
      },
      {
        definition: 4,
        rotation: Math.PI / 4,
        floorColor: 0x97b653,
        wallColor: 0x333333,
        radius: 3,
        noise: 0,
        height: 8,
        altitude: 0.5,
        position: {
          x: 0, y: 0,
        },
      },
      {
        definition: 4,
        rotation: Math.PI / 4,
        floorColor: 0x97b653,
        wallColor: 0x333333,
        radius: 7,
        noise: 0,
        height: 0.5,
        altitude: 8.5,
        position: {
          x: 5, y: 5,
        },
      },
      {
        definition: 4,
        rotation: Math.PI / 4,
        floorColor: 0x97b653,
        wallColor: 0x333333,
        radius: 7,
        noise: 0,
        height: 0.5,
        altitude: 10.5,
        position: {
          x: 5, y: 5,
        },
      },
      {
        definition: 4,
        rotation: Math.PI / 4,
        floorColor: 0x97b653,
        wallColor: 0x333333,
        radius: 7,
        noise: 0,
        height: 0.5,
        altitude: 12.5,
        position: {
          x: 5, y: 5,
        },
      },


      {
        definition: 4,
        floorColor: 0x333333,
        wallColor: 0x222222,
        radius: 0.5,
        noise: 0,
        height: 5,
        altitude: 0,
        rotation: Math.PI / 4,
        position: {
          x: -4.5, y: -4.5,
        },
      },
      {
        definition: 4,
        floorColor: 0x333333,
        wallColor: 0x222222,
        radius: 0.5,
        noise: 0,
        height: 5,
        altitude: 0,
        rotation: Math.PI / 4,
        position: {
          x: -4.5, y: 4.5,
        },
      },
      {
        definition: 4,
        floorColor: 0x333333,
        wallColor: 0x222222,
        radius: 0.5,
        noise: 0,
        height: 8,
        altitude: 0,
        rotation: Math.PI / 4,
        position: {
          x: 4.5, y: 4.5,
        },
      },
      {
        definition: 4,
        floorColor: 0x333333,
        wallColor: 0x222222,
        radius: 0.5,
        noise: 0,
        height: 5,
        altitude: 0,
        rotation: Math.PI / 4,
        position: {
          x: 4.5, y: -4.5,
        },
      },
    ],
  },
});
