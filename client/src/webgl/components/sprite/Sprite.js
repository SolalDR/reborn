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
    console.log(this.tileEnd);
    // current tile number
    this.currentTile = tileStart;
    // duration of every tile
    this.durationTile = durationTile;
    // internal time counter
    this.currentTime = 0;
    // amount of horizontal and vertical tiles, and total count of tiles
    this.hTiles = hTiles;
    this.vTiles = vTiles;
    this.cntTiles = this.hTiles * this.vTiles;
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(1 / this.hTiles, -1 / this.vTiles);

    // this.setOffset();
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
      if (this.currentTile == this.tileEnd) {
        this.currentTile = this.tileStart;
      }
      // console.log(this.currentTile);
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
      // let texture = new THREE.TextureLoader().load(sprite.texture);
      const animator = new TileTextureAnimator(
        this.texture,
        opts.w,
        opts.h,
        sprite.durationTile,
        sprite.start,
        sprite.end,
      );
      const material = new THREE.SpriteMaterial({
        // map: sprite.texture,
        // color: 0xffffff,
        // useScreenCoordinates: false,
        // side: THREE.DoubleSide,
        transparent: true,
      });

      this.spriteMaps.push({
        id: sprite.id,
        animator,
        material,
        // texture: texture,
      });
    });

    // this.spriteMap = new THREE.TextureLoader().load(opts.texture);
    // this.animation = new TileTextureAnimator(this.spriteMap, 16, 16, 1000);
    this.spriteMaterial = new THREE.SpriteMaterial({
      map: this.texture,
      // color: 0xffffff,
      // useScreenCoordinates: false,
      // side: THREE.DoubleSide,
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
    const sprite = this.spriteMaps.find((sprite) => {
      return sprite.id == id;
    });

    this.animation = sprite.animator;
    this.animation.currentTile = this.animation.tileStart;
    this.animation.currentTime = 0;
    this.animation.setOffset();
    // init le offset de la texture

    // if (!this.sprite.material) {
    //   this.spriteMaterial = new THREE.SpriteMaterial({
    //     map: sprite.texture,
    //     // color: 0xffffff,
    //     useScreenCoordinates: false,
    //     side: THREE.DoubleSide,
    //     transparent: true,
    //   });
    // } else {
    //   this.sprite.material.map = sprite.texture;
    // }
    // this.sprite.material.needsUpdate = true;
  }
}
