import SimplexNoise from 'simplex-noise';

const simplex = new SimplexNoise(Math.random);


export default class Generator {
  constructor({
    floorColor = new THREE.Color(0xb7c39b),
    wallColor = new THREE.Color(0x9b989f),
  } = {}) {
    this.floorColor = floorColor;
    this.wallColor = wallColor;

    const stage = [{
      count: 1,
      height: 5,
      width: 32,
      depth: 32,
      start: new THREE.Vector2(0, 0),
    }];


    this.geometry = new THREE.Geometry();
    this.generateMap(stage);
    this.generateColors();
    this.removeExtraFaces();
  }


  generateStageShape({
    definition = 200,
    radius = 16,
    position = new THREE.Vector2(),
    noiseIntensity = 0.2,
  } = {}) {
    const stepAngle = 2 * Math.PI / definition;
    let angle = 0;
    const tmpP = new THREE.Vector2();
    const points = [];

    // All points
    for (let i = 0; i < definition; i += 1) {
      angle = stepAngle * i;
      tmpP.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
      );

      points.push(new THREE.Vector2(
        tmpP.x - tmpP.x * simplex.noise2D(tmpP.x / radius, tmpP.y / radius) * noiseIntensity + position.x,
        tmpP.y - tmpP.y * simplex.noise2D(tmpP.x / radius, tmpP.y / radius) * noiseIntensity + position.y,
      ));
    }

    console.log(this);
    return points;
  }

  generateStageGeometry({
    points = [],
    height = 0.5,
  } = {}) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    points.forEach((p, i) => {
      shape.lineTo(points[i].x, points[i].y);
    });

    const geometry = new THREE.ExtrudeGeometry(shape, {
      steps: 1,
      depth: height,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.2,
      bevelSegments: 5,
    });

    geometry.rotateX(-Math.PI / 2);
    this.geometry.merge(geometry);
  }

  generateMap() {
    this.generateStageGeometry({
      points: this.generateStageShape(),
      height: 0.5,
    });

    this.generateStageGeometry({
      points: this.generateStageShape({
        radius: 10,
        position: new THREE.Vector2(
          Math.random() * 32 - 16,
          Math.random() * 32 - 16,
        ),
        noiseIntensity: 0.2,
      }),
      height: 4,
    });

    this.generateStageGeometry({
      points: this.generateStageShape({
        radius: 10,
        position: new THREE.Vector2(
          Math.random() * 32 - 16,
          Math.random() * 32 - 16,
        ),
        noiseIntensity: 0.2,
      }),
      height: 2,
    });

    this.generateStageGeometry({
      points: this.generateStageShape({
        radius: 4,
        position: new THREE.Vector2(
          Math.random() * 4 - 2,
          Math.random() * 4 - 2,
        ),
        noiseIntensity: 0.1,
      }),
      height: 6,
    });
  }

  generateColors() {
    this.geometry.faces.forEach((face) => {
      if (Math.abs(face.normal.y) < 0.001) {
        face.color = this.wallColor;
      } else {
        face.color = this.floorColor;
      }
    });
    this.geometry.colorsNeedUpdate = true;
    this.geometry.elementsNeedsUpdate = true;
  }

  removeExtraFaces() {
    const faces = [];
    this.geometry.faces.forEach((face) => {
      if (face.normal.y > -0.001) {
        faces.push(face);
      }
    });

    this.geometry.faces = faces;
    this.geometry.elementsNeedsUpdate = true;
  }
}
