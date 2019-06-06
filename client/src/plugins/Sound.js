import Vue from 'vue';
import AssetsManager from '@/services/assets/Manager';
import Emitter from '@solaldr/emitter';

class SoundManager extends Emitter {
  constructor() {
    super();
    this._loaded = false;
    this.sounds = {};
    this.samples = {};
    this.prefix = 'sound_';
    this.on('load', () => {
      this._loaded = true;
    });

    AssetsManager.get('sounds').then((sounds) => {
      this.sounds = sounds;
      this.emit('load');
    });

    this.now = Date.now();
  }

  play(name) {
    if (!this.sounds[this.prefix + name]) return;
    const player = () => this.sounds[this.prefix + name].play();
    if (!this._loaded) {
      this.once('load', player);
      return;
    }
    player();
  }

  has(name) {
    if (!this.sounds[this.prefix + name]) return false;
    return true;
  }

  addSample(name, duration, sounds) {
    this.samples[name] = {
      name,
      sounds,
      duration,
    };
  }


  playSample(name) {
    const sounds = this.samples[name].sounds;
    if (this.currentSample) {
      const duration = this.currentSample.duration;
      this.currentSample.sounds.forEach((sound, index) => {
        const howl = this.sounds[this.prefix + sound.name];
        howl.once('end', () => {
          if (index !== 0) {
            setTimeout(() => howl.stop(), duration);
          } else {
            howl.stop();
          }
          if (index === 0) {
            this.playSample(name);
          }
        });
      });
      this.currentSample = null;
      return;
    }


    sounds.forEach((sound) => {
      setTimeout(() => {
        // console.log('-----playSound', sound.name);
        this.play(sound.name);
      }, sound.delay ? sound.delay : 0);
    });
    this.currentSample = this.samples[name];
  }
}

const SoundPlugin = {
  install() {
    Vue.prototype.$sound = new SoundManager();
  },
};

export default SoundPlugin;
