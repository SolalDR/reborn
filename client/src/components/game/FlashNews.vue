<template>
  <transition name="fade-scale" appear>
    <div class="flash-news">
      <div class="flash-news__title" :class="{'flash-news__title--blinking': blinkTitle}">
        <p>Flash News</p>
      </div>

      <div class="flash-news__texts">
        <p><span class="category">{{ currentCategory }} -</span> {{ currentContent }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import defaultNotifications from '@/contents/game/default-notifications';

export default {
  name: 'flash-news',
  props: {
    gameNotification: Object,
  },
  data() {
    return {
      blinkTitle: false,
      currentCategory: '',
      currentContent: '',
      queue: [],
    };
  },
  mounted() {
    this.intervalDuration = 20000;

    this.defineCurrentNotification();
    this.interval = setInterval(this.defineCurrentNotification, this.intervalDuration)
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    defineCurrentNotification() {
      if (!this.queue[0]) {
        const index = this.getRandomInt(3)

        this.currentCategory = defaultNotifications[index].category
        this.currentContent = defaultNotifications[index].content
      } else {
        this.currentCategory = this.queue[0].category
        this.currentContent = this.queue[0].content
        this.queue.shift();

        this.blinkTitle = true;
        setTimeout(() => {
          this.blinkTitle = false;
        }, 5000);
      }
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
  },
  watch: {
    gameNotification(notification) {
      this.queue.push(notification);
    },
  },
};
</script>

<style lang="scss">
.flash-news {
  overflow: hidden;
  @include useFlex();
  background-color: rgba(getColor(basics, white), .7);
  border: 2px solid getColor(basics, black);
  border-radius: 1rem;

  &__title {
    padding: 1.15rem;
    text-align: center;
    text-transform: uppercase;
    width: 12.5rem;
    border-right: 2px solid getColor(basics, black);

    &--blinking {
      animation: flash-news-blinking 1s linear 5;

      @keyframes flash-news-blinking {
        0% {
          background-color: getColor(gauges, low);
        }
        50% {
          background-color: getColor(gauges, low);
        }
        51% {
          background-color: transparent;
        }
      }
    }

    p {
      @include fontSize(18);
      font-family: "DrukText-Super";
    }
  }

  &__texts {
    $texts-size: 36rem;

    overflow: hidden;
    padding: 0 1.5rem;
    width: $texts-size;

    p {
      width: max-content;
      @include fontSize(14);
      font-family: "DrukText-Bold";
      animation: translate-text 20s infinite linear;

      @keyframes translate-text {
        0% {
          transform: translateX($texts-size);
        }
        100% {
          transform: translateX(calc(-100% - 1.5rem));
        }
      }

      .category {
        font-family: "DrukText-Super";
        text-transform: uppercase;
      }
    }
  }
}
</style>
