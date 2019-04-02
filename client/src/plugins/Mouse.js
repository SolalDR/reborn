const MousePlugin = {
  install(Vue) {
    Vue.prototype.$mouse = new Vue({
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

          this.$bus.$emit('mouse:move', {
            mouse: this,
            event,
          });
        },

        onMouseup(event) {
          this.$bus.$emit('mouse:click', {
            mouse: this,
            event,
          });
        },
      },

      created() {
        window.addEventListener('mousemove', this.onMousemove.bind(this));
        window.addEventListener('mouseup', this.onMouseup.bind(this));
      },
    });
  },
};

export default MousePlugin;
