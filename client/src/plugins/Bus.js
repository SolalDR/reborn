import Vue from 'vue';

const bus = new Vue();
function VueBus() {
  Object.defineProperties(bus, {
    on: {
      get() {
        return this.$on.bind(this);
      },
    },
    once: {
      get() {
        return this.$once.bind(this);
      },
    },
    off: {
      get() {
        return this.$off.bind(this);
      },
    },
    emit: {
      get() {
        return this.$emit.bind(this);
      },
    },
  });

  Vue.prototype.$bus = bus;
}

export { VueBus };
export default bus;
