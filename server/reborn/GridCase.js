export default class GridCase {
  constructor(x, y, {
    altitude = 0,
    reference = null,
  } = {}) {
    this.x = x;
    this.y = y;
    this.altitude = altitude;
    this.reference = null;
  }

  get infos() {
    return {
      x: this.x,
      y: this.y,
      altitude: this.altitude,
      reference: this.reference,
    };
  }
}
