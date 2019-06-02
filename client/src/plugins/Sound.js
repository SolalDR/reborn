import Vue from "vue";
import AssetsManager from "@/services/assets/Manager";
import Emitter from "@solaldr/emitter";

class SoundManager extends Emitter {
  constructor() {
    super();
    this._loaded = false;
    this.sounds = {};
    this.samples = {};
    this.prefix = "sound_"
    this.on('load', () => this._loaded = true);
    AssetsManager.get('sounds').then(sounds => {
      this.sounds = sounds;
      this.emit('load');
    })
    this.now = Date.now();
  }

  play(name) {
    if (!this.sounds[this.prefix + name]) return;
    const player = () => this.sounds[this.prefix + name].play();
    if (!this._loaded) {
      console.log('not loaded');
      this.once('load', player)
      return;
    }
    player();
  }

  addSample(name, duration, sounds) {
    this.samples[name] = {
      sounds,
      duration
    };
    sounds.forEach((sound) => {
      // console.log(this.sounds, sound)
      console.log(this.sounds[this.prefix + sound.name]);
      this.sounds[this.prefix + sound.name].onend = (event) => {
        console.log('onEnd', event);
      }
    })
  }

  playSample(name) {
    const sounds = this.samples[name].sounds;
    sounds.forEach(sound => {
      setTimeout(() => {
        this.play(sound.name);
      }, sound.delay ? sound.delay : 0);
    })
  }
}

const SoundPlugin = {
  install() {
    Vue.prototype.$sound = new SoundManager();
  },
};

export default SoundPlugin;
