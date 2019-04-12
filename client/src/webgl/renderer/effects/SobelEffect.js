import { Uniform } from 'three';
import { Effect, BlendFunction } from 'postprocessing';

import fragment from '../shaders/sobels/shader.frag';

/**
 * A sobel effect
 *
 * Original shader code by Jeroen Baert - jeroen.baert@cs.kuleuven.be
 * http://www.forceflow.be
 */

export default class SobelEffect extends Effect {
  /**
   * Constructs a new bokeh effect.
   *
   * @param {Object} [options] - The options.
   * @param {BlendFunction} [options.blendFunction=BlendFunction.NORMAL] - The blend function of this effect.
   * @param {Number} [options.step=1] - The focus distance ratio, ranging from 0.0 to 1.0.
   */

  constructor({
    blendFunction = BlendFunction.NORMAL,
    step = 1,
    intensity = 1,
    threshold = 0.5,
  } = {}) {
    super('SobelEffect', fragment, {
      blendFunction,
      // attributes: EffectAttribute.CONVOLUTION | EffectAttribute.DEPTH,
      uniforms: new Map([
        ['step', new Uniform(step)],
        ['intensity', new Uniform(intensity)],
        ['threshold', new Uniform(threshold)],
      ]),
    });
  }
}
