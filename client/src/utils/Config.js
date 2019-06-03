/**
 * @class A Config class to create extended configuration
 */
class Config {
  /**
   * @constructor
   * @param {Object} config A simple object with your configuration.
   * @return {Config}
   */
  constructor(config, {
    env = null,
  } = {}) {
    this._env = env;
    this.hydrate(config);

    if (this._env !== null) {
      return new Proxy(this, {
        get(obj, prop) {
          if (obj[obj._env] !== undefined) return obj[obj._env][prop];
          if (obj !== undefined) return obj[prop];
          return undefined;
        },
      });
    }
    return this;
  }

  /**
   * Clone the current config
   * @return {Config}
   */
  clone() {
    return new Config(this);
  }

  /**
   * Clone and extended the configuration.
   * @param {Object} config A simple object with your configuration
   * @returns {Config} Return a new instance of Config with the modified entries
   */
  extends(config) {
    const cloned = this.clone();
    cloned.hydrate(config);
    return cloned;
  }

  /**
   * Hydrate new values in the configuration object. If values already defined, it will merge
   * @param {Object} config
   */
  hydrate(config) {
    Object.keys(config).forEach((key) => {
      if (key === '_env') return;
      const tempValue = config[key];

      // If the key is already defined and is an instance of Config
      if (this[key] && this[key] instanceof Config) {
        // Check if the entering value is an instance of config or an Object
        if (tempValue instanceof Config || tempValue.constructor === Object) {
          this[key].hydrate(tempValue);
        }
        return;
      }

      // All object with clone method
      if (tempValue.clone) {
        this[key] = tempValue.clone();
      } else if (tempValue.constructor === Object) {
        this[key] = new Config(tempValue);
      } else {
        this[key] = tempValue;
      }
    });
  }
}

export const c = (_, arg) => new Config(_, arg);
export default Config;
