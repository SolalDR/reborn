import { c } from "@/utils/Config";

export default c({
  map: {
    stages: [
      {
        definition: 200,
        floorColor: 0xf7c0a4,
        wallColor: 0xf9e78f,
        radius: 16,
        position: {
          x: 0,
          y: 0,
        },
        noise: [0.2, 0.5],
        height: 0.5
      },
      {
        definition: 64,
        floorColor: 0xf4b295,
        wallColor: 0xf9e78f,
        radius: 8,
        position: {
          x: [-4, 4],
          y: [-4, 4],
        },
        noise: 0.2,
        height: 1
      },
      {
        definition: 64,
        floorColor: 0xf8dbca,
        wallColor: 0xf9e78f,
        radius: 8,
        position: {
          x: [-4, 4],
          y: [-4, 4],
        },
        noise: 0.2,
        height: 2,
      },
      {
        definition: 32,
        floorColor: 0xf4b69d,
        wallColor: 0xf9e78f,
        radius: 4,
        position: {
          x: [-2, 2],
          y: [-2, 2],
        },
        noise: 0.1,
        height: 4,
      },
      {
        definition: 32,
        floorColor: 0xf7ab9a,
        wallColor: 0xf9e78f,
        radius: 2,
        position: {
          x: [-8, 8],
          y: [-8, 8]
        },
        noise: 0.1,
        height: [6, 11],
      },
    ]
  }
});
