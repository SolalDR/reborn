import {
  Mesh, Shape, Geometry, ExtrudeGeometry, Color, Material, Vector2, Raycaster, Vector3,
} from 'three';

import SimplexNoise from 'simplex-noise';


const generator = {
  /**
   * Etape 1:
   * Génèrer des formes sinusoidale (shape)
   * @param {integer} definition Le nombre de points définissant le contour de la shape
   * @param {float} radius Le rayon maximum de la shape
   * @param {vec2} position Le centre de la shape
   * @param {float} noiseIntensity Le facteur de noise influé sur le rayon (ex: 0.2*16 = 3.2 de renfoncement)
   */
  generateStageShape({
    definition = 200,
    radius = 16,
    position = new Vector2(),
    noiseIntensity = 0.2,
  } = {}) {
    const stepAngle = 2 * Math.PI / definition;
    let angle = 0;
    const tmpP = new Vector2();
    const points = [];

    // For each point
    for (let i = 0; i < definition; i += 1) {
      angle = stepAngle * i;

      // Coordonnées dans le cercle
      tmpP.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
      );

      // Coordonnées avec noise
      points.push(new Vector2(
        tmpP.x - tmpP.x * ((this.simplex.noise2D(tmpP.x / radius, tmpP.y / radius) + 1) / 2) * noiseIntensity + position[0],
        tmpP.y - tmpP.y * ((this.simplex.noise2D(tmpP.x / radius, tmpP.y / radius) + 1) / 2) * noiseIntensity + position[1],
      ));
    }

    // Création de la shape
    const shape = new Shape();
    shape.moveTo(points[0].x, points[0].y);
    points.forEach((p, i) => {
      shape.lineTo(points[i].x, points[i].y);
    });

    return shape;
  },

  /**
   * Etape 2:
   * Créer des géométrie extrudé en partant de ces shapes
   * @param {THREE.Shape} shape La shape préalablement crée
   * @param {float} height La hauteur de la géométrie
   */
  generateStageGeometry({
    shape = null,
    height = 0.5,
    wallColor = null,
    floorColor = null,
  } = {}) {
    if (!shape) return;

    const geometry = new ExtrudeGeometry(shape, {
      steps: 1,
      depth: height,
      bevelEnabled: true,
      bevelThickness: 0.001,
      bevelSize: 0.001,
      bevelSegments: 1,
    });

    // Rotate la géométrie pour avoir la shape vers le haut
    geometry.rotateX(-Math.PI / 2);

    geometry.faces.forEach((face) => {
      // Si la normal ne pointe pas vers le haut, c'est le mur
      if (Math.abs(face.normal.y) < 0.001) {
        face.color = wallColor;
      } else { // Sinon c'est le sol
        face.color = floorColor;
      }
    });

    geometry.colorsNeedUpdate = true;
    geometry.elementsNeedsUpdate = true;

    // Merge la géométrie extrudé avec la géometrie globale
    this.geometry.merge(geometry);
  },

  /**
   * Etape 3
   * Supprimé les faces du dessous
   */
  removeExtraFaces() {
    const faces = [];
    this.geometry.faces.forEach((face) => {
      // Si la normal pointe ne pointe pas vers le bas on garde la face
      if (face.normal.y > -0.001) {
        faces.push(face);
      }
    });

    this.geometry.faces = faces;
    this.geometry.elementsNeedsUpdate = true;
  },

  /**
   * Etape 4
   * Générer les couleurs
   */
  generateColors() {
    this.geometry.faces.forEach((face) => {
      // Si la normal ne pointe pas vers le haut, c'est le mur
      if (Math.abs(face.normal.y) < 0.001) {
        face.color = this.wallColor;
      } else { // Sinon c'est le sol
        face.color = this.floorColor;
      }
    });

    this.geometry.colorsNeedUpdate = true;
    this.geometry.elementsNeedsUpdate = true;
  },

  /**
   * Etape 5
   * Créer une grille d'altitude de la géométrie
   */
  cast() {
    // Crée une mesh avec un material factice
    this.mesh = new Mesh(this.geometry, new Material());
    this.raycaster = new Raycaster();
    const origin = new Vector3();
    const direction = new Vector3(0, -1, 0);
    const results = [];

    // Pour chaque sommet de la grille
    for (let i = 0; i < 32; i += 1) {
      for (let j = 0; j < 32; j += 1) {
        origin.set(i - 16, 20, j - 16);
        this.raycaster.set(origin, direction);

        // Intersect en pointant vers le bas
        const intersect = this.raycaster.intersectObject(this.mesh, false);
        results.push(intersect[0] || null);
      }
    }
    return results;
  },


  /**
   * Etape 6
   * Déterminer pour chaque case de la grille si elle est constructible
   */
  validateGrid(results) {
    let topLeft; let topRight; let bottomRight; let
      bottomLeft;

    // Grille finale
    this.gridDatas = new Array(results.length).fill(null);

    // Pour chaque sommet jusqu'à (n - 1)
    for (let i = 0; i < 31; i += 1) {
      for (let j = 0; j < 31; j += 1) {
        // Récupère chaque sommet de la case
        topLeft = results[i + j * 32];
        topRight = results[i + 1 + j * 32];
        bottomRight = results[i + 1 + (j + 1) * 32];
        bottomLeft = results[i + (j + 1) * 32];

        // Si les sommets sont non-null et ont la même hauteur

        if (topLeft && topRight && bottomRight && bottomLeft) {
          const averageHeight = (topLeft.distance + topRight.distance + bottomRight.distance + bottomLeft.distance) / 4;
          if (
            Math.abs(averageHeight - topLeft.distance) < 0.01
            && Math.abs(averageHeight - topRight.distance) < 0.01
            && Math.abs(averageHeight - bottomRight.distance) < 0.01
            && Math.abs(averageHeight - bottomLeft.distance) < 0.01) {
            this.gridDatas[i + j * 32] = {
              altitude: results[i + j * 32].point.y,
            };
          }
        }
      }
    }
  },


  init(seed, stages, {
    floorColor = new Color(0xb7c39b),
    wallColor = new Color(0x9b989f),
  } = {}) {
    this.floorColor = floorColor;
    this.wallColor = wallColor;
    this.seed = seed;
    this.stages = stages;
    this.simplex = new SimplexNoise(this.seed);
    this.geometry = new Geometry();

    this.stages.forEach((stage) => {
      const shape = this.generateStageShape(stage.shape);
      this.generateStageGeometry({
        height: stage.height,
        shape,
        floorColor: stage.floorColor,
        wallColor: stage.wallColor,
      });
    });

    this.removeExtraFaces();
    // this.generateColors();
    const results = this.cast(this.mesh);
    this.validateGrid(results);

    // Return au main thread
    postMessage({
      vertices: this.geometry.vertices,
      faces: this.geometry.faces,
      gridDatas: this.gridDatas,
    });
  },
};


onmessage = function (event) {
  if (event.data.seed) {
    generator.init(event.data.seed, event.data.stages);
  }
};
