import * as THREE from 'three';

class TileTextureAnimator {
  constructor(
    texture,
    hTiles,
    vTiles,
    durationTile,
    tileStart = 0,
    tileEnd = hTiles * vTiles,
  ) {
    this.texture = texture;
    this.tileStart = tileStart;
    this.tileEnd = tileEnd + 1;
    this.currentTile = tileStart;

    this.durationTile = durationTile;
    this.currentTime = 0;
    this.hTiles = hTiles;
    this.vTiles = vTiles;
    this.cntTiles = this.hTiles * this.vTiles;
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(1 / this.hTiles, -1 / this.vTiles);
  }

  setOffset() {
    const indexColumn = this.currentTile % this.hTiles;
    const indexRow = Math.floor(this.currentTile / this.hTiles) + 1;
    this.texture.offset.x = indexColumn / this.hTiles;
    this.texture.offset.y = indexRow / this.vTiles;
  }

  update(delta) {
    this.currentTime += delta;
    while (this.currentTime > this.durationTile) {
      this.currentTime -= this.durationTile;
      if (this.currentTile === this.tileEnd) {
        this.currentTile = this.tileStart;
      }
      this.setOffset();
      this.currentTile++;
    }
  }
}

export default class Sprite extends THREE.Object3D {
  constructor(opts = {}) {
    super();
    this.options = opts;
    this.spriteMaps = [];
    this.texture = new THREE.TextureLoader().load(opts.texture);
    this.options.sprites.forEach((sprite) => {
      const animator = new TileTextureAnimator(
        this.texture,
        opts.w,
        opts.h,
        sprite.durationTile,
        sprite.start,
        sprite.end,
      );
      const material = new THREE.SpriteMaterial({
        transparent: true,
      });

      this.spriteMaps.push({
        id: sprite.id,
        animator,
        material,
      });
    });

    this.spriteMaterial = new THREE.SpriteMaterial({
      map: this.texture,
      transparent: true,
      alphaTest: 0.5,
    });

    this.add(new THREE.Sprite(this.spriteMaterial));
    this.changeState('default');
  }

  update(t) {
    this.animation.update(t);
  }

  changeState(id) {
    const sprite = this.spriteMaps.find((s) => {
      return s.id === id;
    });

    this.animation = sprite.animator;
    this.animation.currentTile = this.animation.tileStart;
    this.animation.currentTime = 0;
    this.animation.setOffset();
  }
}
