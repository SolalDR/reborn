<template>
  <overlay :has-cross="true" :fade-out="true" @closeOverlay="closeOverlay">
    <template #header>
      <h2 class="title--wide" v-html="$splitWithSpan(texts.title)"></h2>
    </template>

    <template #default>
      <div class="about">
        <p class="about__title" v-html="$splitWithSpan(texts.content.title)"></p>

        <div class="about__item">
          <p v-html="$splitWithSpan(texts.content.designers.title)"></p>

          <p v-for="(member , index) in texts.content.designers.members"
             :key="`designer-member-${index}`"
             v-html="$splitWithSpan(member)"></p>
        </div>

        <div class="about__item">
          <p v-html="$splitWithSpan(texts.content.developers.title)"></p>

          <p v-for="(member , index) in texts.content.developers.members"
             :key="`developer-member-${index}`"
             v-html="$splitWithSpan(member)"></p>
        </div>

        <p v-html="$splitWithSpan(texts.content.thanks)"></p>
      </div>
    </template>
  </overlay>
</template>

<script>
import texts from '@/contents/home/about';
import Overlay from '../global/Overlay';

export default {
  name: 'about',
  components: {
    Overlay,
  },
  props: ['closeOverlay'],
  data() {
    return {
      texts: texts,
    };
  },
};
</script>

<style lang="scss">
  .about {
    &__title,
    &__item {
      margin-bottom: $space-xl;
    }

    &__item {
      p {
        line-height: 2.2rem;
      }

      p:first-of-type {
        margin-bottom: $space-l;
      }
    }
  }
</style>
