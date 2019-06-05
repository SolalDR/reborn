import { c } from '@/utils/Config';

export default c({
  light: {
    ambient: {
      color: 0xFFFFFF,
      intensity: 0.5,
    },
    directional: {
      position: new THREE.Vector3(0, 15, 15),
      color: 0xFFFFFF,
      intensity: 0.5,
    },
  },
  water: {
    waves: 100,
    color: 0x7AE2B6,
    specular: 0x000000,
  },
  map: {
    specular: 0x798133,
    reflectivity: 0,
    shininess: 0.5,
    stages: [
      {
        definition: 100,
        floorColor: 0xf7c0a4,
        wallColor: 0xf9e78f,
        radius: 16,
        noise: [0.2, 0.5],
        height: 0.5,
        position: { x: 0, y: 0 },
      },
      {
        definition: 32,
        floorColor: 0xf4b295,
        wallColor: 0xf9e78f,
        radius: 8,
        noise: 0.2,
        height: 1,
        position: { x: [-4, 4], y: [-4, 4] },
      },
      {
        definition: 32,
        floorColor: 0xf8dbca,
        wallColor: 0xf9e78f,
        radius: 8,
        noise: 0.2,
        height: 2,
        position: { x: [-4, 4], y: [-4, 4] },
      },
      {
        definition: 16,
        floorColor: 0xf4b69d,
        wallColor: 0xf9e78f,
        radius: 4,
        noise: 0.1,
        height: 4,
        position: { x: [-2, 2], y: [-2, 2] },
      },
      {
        definition: 16,
        floorColor: 0xf7ab9a,
        wallColor: 0xf9e78f,
        radius: 2,
        noise: 0.1,
        height: [6, 11],
        position: { x: [-8, 8], y: [-8, 8] },
      },
    ],
  },
});
