<template>
  <div>
    <flash-news/>
  </div>
</template>

<script>
import Icon from '../components/icons/Icon';
import FlashNews from "../components/game/FlashNews";

export default {
  name: 'test',
  components: {
    FlashNews,
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
