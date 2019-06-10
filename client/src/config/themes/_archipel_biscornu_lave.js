import defaultTheme from './_default';


const stagesIcebergCount = 20;
const icebergs = [];

for (let index = 0; index < stagesIcebergCount; index += 1) {
  icebergs.push({
    definition: 8,
    floorColor: 0x8da0a4,
    wallColor: 0x4a5a61,
    radius: [3, 4],
    noise: [0.1, 0.5],
    height: [0.5, 5], // random
    position: {
      x: [-16, 16],
      y: [-16, 16],
    },
  });
}


export default defaultTheme.extends({
  water: {
    color: 0xe07b74,
  },

  map: {
    stages: [
      // {
      //   definition: 100,
      //   floorColor: 0xFFFFFF,
      //   wallColor: 0xf7c0a4,
      //   radius: 16,
      //   noise: [0.2, 0.5],
      //   height: 0.5,
      //   position: { x: 0, y: 0 },
      // },
      ...icebergs,
    ],
  },
});
