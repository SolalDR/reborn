import { Howl } from 'howler';

/**
 * @author SolalDR / https://solaldussout-revel.fr/
 */

class SoundLoader {
  load(url, onLoad, onProgress, onError, datas = {}) {
    const sound = new Howl({
      src: url,
      ...datas,
      // preload: true
    });

    sound.once('load', () => {
      onLoad(sound);
    });

    sound.once('loaderror', () => {
      onError(sound);
    });
  }
}

export default SoundLoader;
