<template>
  <div class="logger" :class="{
    'logger--visible': visible
  }">

    <div class="logger__button" @click="click">
      <span></span>
      <span></span>
    </div>

    <div class="logger__filterList">
      <div v-for='(filter, i) in Object.keys($store.state.debug.labels)'
      :key="'filter-' + i"
      :style="`--color: ${$store.state.debug.labels[filter].color};`"
      :class="{
        'logger__filter--active': labels.indexOf(filter) >= 0
      }"
      @click="onClickLabel(filter)"
      class="logger__filter" >
        {{ filter }}
      </div>

      <input type="number" v-model="importance" value="1">
    </div>

    <div v-if="$store.state.debug.messages" class="logger__messageList">
      <p v-for="(message, i) in messagesFiltered"
        :key="'message-' + i"
        :style="`--color: ${$store.state.debug.labels[message.label].color};`"
        class="logger__message">
        {{ message.label }}: {{ message.content }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      labels: [],
      importance: 1,
    };
  },

  computed: {
    messagesFiltered() {
      if (this.labels.length === 0) {
        return this.$store.state.debug.messages;
      }

      return this.$store.state.debug.messages
        .filter(message => this.labels.indexOf(message.label) >= 0
          && message.importance <= this.importance);
    },
  },

  methods: {
    click() {
      this.visible = !this.visible;
    },

    onClickLabel(label) {
      if (this.labels.indexOf(label) >= 0) {
        this.labels.splice(this.labels.indexOf(label), 1);
      } else {
        this.labels.push(label);
      }
    },
  },
};
</script>

<style lang="scss">
$color: #130828d4;
.logger {
  $s: &;
  z-index: 999;
  position: fixed;
  top: 0;
  left: -100%;
  pointer-events: none;
  width: 100%;
  height: 100%;
  background-color: $color;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: {
    duration: .5s;
    timing-function: ease-in;
    property: transform;
  }

  &--visible {
    pointer-events: all;
    transform: translateX(100%) translateY(0) translateZ(0);
  }

  &__button {
    pointer-events: all;
    position: absolute;
    width: 60px;
    height: 60px;
    top: calc(50% - 30px);
    right: -30px;
    background-color: #130828d4;
    border-radius: 60px;

    span {
      --rotation: 0deg;
      position: absolute;
      top: 50%;
      transform: translate3d(-50%, -50%, 0) rotate(var(--rotation));
      height: 4px;
      width: 20px;
      display: inline-block;
      background-color: white;
      transform: {
        origin: center;
      }

      &:first-child {
        --rotation: 90deg;
        left: 70%;
      }
      &:last-child {
        --rotation: 0;
        left: 70%;
      }
    }
  }

  &--visible .logger__button span {
    &:first-child {
      --rotation: 0;
      left: 30%;
    }
    &:last-child {
      --rotation: 0;
      left: 30%;
    }
  }

  &__filter {
    background-color: var(--color);
    color: white;
    padding: .5rem 1rem;
    border-radius: 2rem;
    margin-right: 0.5rem;
    border: 2px solid transparent;
    cursor: pointer;
    &List {
      display: flex;
      margin-bottom: 1rem;
    }
    &--active {
      border: 2px solid white;
    }
  }

  &__message {
    margin: 0;
    color: white;
    &::before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 5px;
      background-color: var(--color);
      display: inline-block;
      margin-right: 10px;
    }
    &List {
      margin-right: 3rem;
      padding: 1rem;
      background-color: $color;
      border-radius: 2rem;
      flex: 1;
      overflow: scroll;
    }
  }
}
</style>
