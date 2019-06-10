<template>
  <div class="world-notification">
    <transition-group name="fade-top-notif" tag="div">
      <webgl-component
        v-for="notification in notifications"
        :key='"notification-" + notification.id'
        :position="notification.position">
        <p class="notification__content">
          {{ notification.content }}
        </p>
      </webgl-component>
    </transition-group>
  </div>
</template>

<script>
import uuidGenerate from '@/utils/uuid';
import WebglComponent from './WebglComponent';

export default {
  data() {
    return {
      notifications: [],
    };
  },
  components: {
    WebglComponent,
  },
  mounted() {
    this.$bus.$on('world:notification', (notifiaction) => {
      const id = uuidGenerate();
      this.notifications.push({
        ...notifiaction,
        id,
      });

      setTimeout(() => {
        this.notifications = this.notifications.filter(notification => notification.id !== id);
      }, 400);
    });
  },
};
</script>

<style lang="scss" scoped>

.notification {
  &__content {
    font-family: "DrukText-Bold";
    pointer-events: none;
  }
}

.fade-top-notif {
  &-enter-active, &-leave-active {
    --duration: .4s;
    transition-duration: var(--duration);
    transition-property: none;
  }

  //  &-leave-active {
  //    transition-property: transform;
  //  }

  &-enter-active .notification__content {
    --duration: .4s;
    transition: {
      duration: var(--duration);
      timing-function: linear;
      property: opacity, transform;
    }
  }

  &-leave-active .notification__content {
    --duration: .4s;
    transition: {
      duration: var(--duration);
      timing-function: linear;
      property: opacity, transform;
    }
  }
}

.fade-top-notif {
  &-enter .notification__content {
    opacity: 0;
    transform: scale(.8) translate3d(0, 40px, 0) !important;
  }
  &-leave-to .notification__content {
    opacity: 0;
    transform: translate3d(0, -40px, 0) !important;
  }

  // &-leave-to {
  //   transform: translate3d(100vw, 0, 0) !important;
  // }
}


</style>
