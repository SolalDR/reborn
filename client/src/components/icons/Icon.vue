<template>
  <svg :viewBox="`0 0 ${height} ${height}`"
       :width="height"
       :height="height"
       :fill="isFilled ? 'black' : 'transparent'"
       fill-rule="evenodd"
       class="icon"
       :class="gaugeFillClasses">
    <clipPath :id="`${iconName}-clip-path`">
      <rect x="0"
            :y="height"
            :width="height"
            :height="boundedHeight"
            :transform="`translate(0, -${boundedHeight})`"/>
    </clipPath>

    <path :id="`${iconName}-path`"
          stroke="#000"
          stroke-width="2"
          :d="paths[iconName]"/>

    <use class="icon-fill" :clip-path="`url(#${iconName}-clip-path)`" :xlink:href="`#${iconName}-path`"/>
  </svg>

</template>

<script>
import paths from './paths';

export default {
  name: 'icon',
  props: {
    isFilled: {
      type: Boolean,
      default: false,
    },
    percent: Number,
    iconName: String,
  },
  data() {
    return {
      height: 45,
      paths: paths,
    };
  },
  computed: {
    boundedHeight() {
      return this.percent * this.height / 100;
    },
    gaugeFillClasses() {
      return {
        'icon--high': this.boundedHeight >= this.height * 0.7,
        'icon--medium': this.boundedHeight >= this.height * 0.4 && this.boundedHeight < this.height * 0.7,
        'icon--low': this.boundedHeight < this.height * 0.4,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  rect {
    transition: all .3s linear;
  }

  .icon {
    position: relative;
    display: block;
    margin-right: 3rem;

    .icon-fill {
      transition: all .3s linear;
    }

    &--high {
      .icon-fill {
        fill: getColor(gauges, high);
      }
    }

    &--medium {
      .icon-fill {
        fill: getColor(gauges, medium);
      }
    }

    &--low {
      animation: shaking .1s linear infinite;

      @keyframes shaking {
        25% {
          transform: rotate(-6deg);
        }
        75% {
          transform: rotate(6deg);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .icon-fill {
        fill: getColor(gauges, low);
      }
    }
  }
</style>
