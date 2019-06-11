import defaultTheme from './_default';


const stagesIcebergCount = 30;
const icebergs = [];

for (let index = 0; index < stagesIcebergCount; index += 1) {
  icebergs.push({
    definition: 8,
    floorColor: 0xa3ba5f,
    wallColor: 0xece4d4,
    radius: [1, 2],
    noise: 0,
    height: [2, 15], // random
    position: {
      x: [-16, 16],
      y: [-16, 16],
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
        definition: 24,
        floorColor: 0xa3ba5f,
        wallColor: 0xece4d4,
        radius: 16,
        noise: [0.2, 0.5],
        height: 0.5,
        position: { x: 0, y: 0 },
      },
      ...icebergs,
    ],
  },
});
