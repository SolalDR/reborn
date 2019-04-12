import { Uniform } from 'three';
import { Effect, BlendFunction } from 'postprocessing';

import fragment from '../shaders/film/shader.frag';

/**
 * A sobel effect
 *
 * Original shader code by Jeroen Baert - jeroen.baert@cs.kuleuven.be
 * http://www.forceflow.be
 */

export default class FilmEffect extends Effect {
  /**
   * Constructs a new bokeh effect.
   *
   * @param {Object} [options] - The options.
   * @param {BlendFunction} [options.blendFunction=BlendFunction.NORMAL] - The blend function of this effect.
   * @param {Number} [options.step=1] - The focus distance ratio, ranging from 0.0 to 1.0.
   */

  constructor({
    blendFunction = BlendFunction.NORMAL,
    intensity = 0.1,
    offset = 0,
  } = {}) {
    super('FilmEffect', fragment, {
      blendFunction,
      // attributes: EffectAttribute.CONVOLUTION | EffectAttribute.DEPTH,
      uniforms: new Map([
        ['intensity', new Uniform(intensity)],
        ['offset', new Uniform(offset)],
      ]),
    });

    // console.log(EffectAttribute.CONVOLUTION);
  }
}
