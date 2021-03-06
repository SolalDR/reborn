import defaultTheme from './_default';


const count = 8;
const strates = [];

for (let index = 0; index < count; index += 1) {
  strates.push({
    definition: 24,
    floorColor: 0x8da0a4,
    wallColor: 0x4a5a61,
    radius: [16 - index * 2, 16 - index * 2],
    noise: [0.0, 0.0 + (index / count) * 0.0],
    height: index * 1.5 + 0.5,
    position: {
      x: [-1, 1],
      y: [-1, 1],
    },
  });
}

export default defaultTheme.extends({
  water: {
    color: 0xe07b74,
    waves: 500,
  },

  map: {
    stages: [
      ...strates,
    ],
  },
});
