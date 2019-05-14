import { Howl, Howler } from 'howler';

/**
 * @author SolalDR / https://solaldussout-revel.fr/
 */


class SoundLoader {
  load(url, onLoad, onProgress, onError) {
    const sound = new Howl({
      src: url,
      // preload: true
    });

    sound.once('load', () => {
      onLoad(sound);
    });
  }
}

export default SoundLoader;
