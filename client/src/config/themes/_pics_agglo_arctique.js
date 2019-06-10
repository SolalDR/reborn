import defaultTheme from './_default';


const stagesIcebergCount = 15;
const icebergs = [];

for (let index = 0; index < stagesIcebergCount; index += 1) {
  icebergs.push({
    definition: 8,
    floorColor: 0xfbfcfd,
    wallColor: 0xbaafb2,
    radius: [1, 4],
    noise: 0.3,
    height: [1, 15], // random
    position: {
      x: [-6, 6],
      y: [-6, 6],
    },
  });
}


export default defaultTheme.extends({
  water: {
    color: 0xabb9da,
  },

  map: {
    stages: [
      {
        definition: 32,
        floorColor: 0xFFFFFF,
        wallColor: 0xf7c0a4,
        radius: 8,
        noise: [0.1, 0.5],
        height: 0.5,
        position: { x: 0, y: 0 },
      },
      ...icebergs,
    ],
  },
});
