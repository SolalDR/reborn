import Vue from 'vue';

const viewport = new Vue({
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },

  created() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.ratio = this.width / this.height;
      this.$emit('resize', this);
    });
  },
});

const ViewportPlugin = {
  install() {
    Vue.prototype.$viewport = viewport;
  },
};

export default viewport;
export { ViewportPlugin };
