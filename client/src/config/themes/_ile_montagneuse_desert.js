import defaultTheme from './_default';


const count = 8;
const strates = [];

for (let index = 0; index < count; index += 1) {
  strates.push({
    definition: 24,
    floorColor: 0xf7c0a4,
    wallColor: 0xf9e78f,
    radius: [16 - index * 2, 16 - index * 2],
    noise: [0.2, 0.4],
    height: index * 1.5 + 0.5,
    position: {
      x: [-4, 4],
      y: [-4, 4],
    },
  });
}

console.log(strates);

export default defaultTheme.extends({
  water: {
    color: 0x7AE2B6,
    waves: 500,
  },

  map: {
    stages: [
      ...strates,
    ],
  },
});
