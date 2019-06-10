import defaultTheme from './_default';


const count = 8;
const strates = [];

for (let index = 0; index < count; index += 1) {
  strates.push({
    definition: 24,
    floorColor: 0xa3ba5f,
    wallColor: 0xece4d4,
    radius: [16 - index * 2, 16 - index * 2],
    noise: [0.2, 0.4],
    height: index * 1.5 + 0.5,
    position: {
      x: [-4, 4],
      y: [-4, 4],
    },
  });
}

export default defaultTheme.extends({
  water: {
    color: 0x88d5d4,
    waves: 500,
  },

  map: {
    stages: [
      ...strates,
    ],
  },
});
