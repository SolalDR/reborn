const ViewportPlugin = {
  install(Vue) {
    Vue.prototype.$mouse = new Vue({
      data() {
        return {
          width: 0,
          height: 0,
        };
      },
      created() {
        window.addEventListener('resize', () => {
          this.width = window.innerWidth;
          this.height = window.innerHeight;
          this.$bus.emit('viewport:resize', this);
        });
      },
    });
  },
};

export default ViewportPlugin;
