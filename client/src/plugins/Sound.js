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


  playSample(nameSample) {
    // Si le sample est déjà jouer
    if (this.currentSample && nameSample === this.currentSample.name) return;

    const sounds = this.samples[nameSample].sounds;

    // Si un sample est déjà en train d'être joué
    if (this.currentSample) {
      // Stop current sounds
      // console.log(this.currentSample);
      this.currentSample.sounds.forEach((sound, index) => {
        const howl = this.sounds[this.prefix + sound.name];
        howl.once('end', () => {
          // console.log(`end ${sound.name}`);
          howl.stop();
          if (index === 0) {
            this.playSample(nameSample);
          }
        });
      });
      this.currentSample = null;
      return;
    }

    sounds.forEach((sound) => {
      setTimeout(() => {
        this.play(sound.name);
      }, sound.delay ? sound.delay : 0);
    });
    this.currentSample = this.samples[nameSample];
  }

  stopCurrentSample() {
    this.currentSample.sounds.forEach((sound) => {
      const howl = this.sounds[this.prefix + sound.name];
      howl.once('end', () => howl.stop());
    });
  }
}


const Manager = new SoundManager();
const SoundPlugin = {
  install() {
    Vue.prototype.$sound = Manager;
  },
};

export default Manager;
export { SoundPlugin };
