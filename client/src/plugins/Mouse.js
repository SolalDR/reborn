import Vue from 'vue';

const mouse = new Vue({
  data() {
    return {
      position: new THREE.Vector2(),
      normalized: new THREE.Vector2(),
    };
  },

  methods: {
    onMousemove(event) {
      this.position.x = event.clientX;
      this.position.y = event.clientY;
      this.normalized.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.normalized.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.$emit('move', {
        mouse: this,
        event,
      });
    },

    onMouseDown(event) {
      this.$emit('dragstart', {
        mouse: this,
        event,
      });
    },

    onMouseup(event) {
      this.$emit('dragend');
      this.$emit('click', {
        mouse: this,
        event,
      });
    },

    onMouseWheel(event) {
      this.$emit('wheel', {
        event,
      });
    },
  },

  created() {
    window.addEventListener('mousemove', this.onMousemove.bind(this));
    window.addEventListener('mouseup', this.onMouseup.bind(this));
    window.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('wheel', this.onMouseWheel.bind(this));

    this.$on('dragstart', () => {
      const origin = this.position.clone();
      let delta = new THREE.Vector2();

      const callbackMove = (event) => {
        delta = this.position.clone().sub(origin);
        this.$emit('dragmove', {
          mouse: this,
          delta,
          event,
        });
      };

      this.$on('move', callbackMove);
      this.$once('dragend', () => {
        this.$off('move', callbackMove);
      });
    });
  },
});

const MousePlugin = {
  install() {
    Vue.prototype.$mouse = mouse;
  },
};

export default mouse;
export { MousePlugin };
