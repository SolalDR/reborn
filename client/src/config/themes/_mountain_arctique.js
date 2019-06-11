import defaultTheme from './_default';
import { Easing } from "@solaldr/animate";

const count = 8;
const strates = [];

for (let index = 0; index < count; index += 1) {
  const x = Easing.easeOutQuad(index / count);
  strates.push({
    definition: 24,
    floorColor: 0xfbfcfd,
    wallColor: 0xbaafb2,
    radius: 16 - 15 * x,
    noise: [0.0, 0.0 + (index / count) * 0.0],
    height: index * 1.5 + 0.5,
    position: {
      x: index === 0 ? 0 : [-0.5, 0.5],
      y: index === 0 ? 0 : [-0.5, 0.5],
    },
  });
}

export default defaultTheme.extends({
  water: {
    color: 0xabb9da,
    waves: 500,
  },

  map: {
    stages: [
      ...strates,
    ],
  },
});
