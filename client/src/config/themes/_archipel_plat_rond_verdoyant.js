import defaultTheme from './_default';


const stagesIcebergCount = 15;
const icebergs = [];

for (let index = 0; index < stagesIcebergCount; index += 1) {
  icebergs.push({
    definition: 62,
    floorColor: 0xa3ba5f,
    wallColor: 0xece4d4,
    radius: [2, 6],
    noise: [0.1, 0, 5],
    height: [0.2, 2], // random
    position: {
      x: [-13, 13],
      y: [-13, 13],
    },
  });
}


export default defaultTheme.extends({
  water: {
    color: 0x88d5d4,
  },

  map: {
    stages: [

      {
        definition: 32,
        floorColor: 0xFFFFFF,
        wallColor: 0xf7c0a4,
        radius: 10,
        noise: [0.1, 0, 2],
        height: 0.18,
        position: { x: 0, y: 0 },
      },
      ...icebergs,
    ],
  },
});
