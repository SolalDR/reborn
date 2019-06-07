<template>
  <div>
    <icon :percent="percent" icon-name="satisfaction"/>
  </div>
</template>

<script>
import Icon from '../components/icons/GaugeIcon';

export default {
  name: 'test',
  components: {
    Icon,
  },
  data() {
    return {
      percent: 100,
    };
  },
  mounted() {
    setInterval(() => {
      this.percent -= 4;
    }, 500);
  },
};
</script>
