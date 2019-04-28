<template>
  <main class="game">
    <scene v-if="$store.state.game" @mounted="onWebGLInit"/>
    <div class="game__interface">
      <div class="metrics">
        <!-- TODO: Bind metrics -->
        <metric v-for="(metric, index) in 2" :key="index" :metric="{}"/>
      </div>

      <div class="years-counter">
        <!-- TODO: Bind currentYear value -->
        <years-counter :currentYear="75"/>
      </div>

      <div class="indicators">
        <!-- TODO: Bind indicators -->
        <indicator v-for="(indicator, index) in 2" :key="index" :indicator="{}"/>
      </div>

      <div class="inventory">
        <div class="categories">
          <category v-for="(category, index) in categories"
                    :key="`category-${index}`"
                    :category="{index: index, ...category}"
                    @setCurrentCategory="setCurrentCategory"
                    :class="{'category--current': index === currentCategory}"/>
        </div>

        <div class="entities">
          <entity v-for="(entity, index) in entities"
                  :key="`entity-${index}`"
                  :entity="{index: index, ...entity}"
                  @setCurrentEntity="setCurrentEntity"
                  :class="{'entity--current': index === currentEntity}"/>
        </div>
      </div>

      <div @click="showSettings = true" class="settings-cta">
        Settings
      </div>

      <transition name="settings">
        <settings v-if="showSettings" @closeSettings="showSettings = false"/>
      </transition>
    </div>
  </main>
</template>

<script>
import Metric from '../components/game/Metric.vue';
import Entity from '../components/game/Entity.vue';
import Scene from '../components/game/Scene.vue';
import Indicator from '../components/game/Indicator.vue';
import Settings from '../components/game/Settings.vue';
import YearsCounter from '../components/game/YearsCounter.vue';
import Category from '../components/game/Category.vue';
import AssetsManager from '../services/assets/Manager';
import Reborn from '../game';
import config from '../config';
import GameHelpers from './helpers/Game';

export default {
  data() {
    return {
      loaded: false,
    };
  },

  components: {
    Category,
    YearsCounter,
    Settings,
    Indicator,
    Scene,
    Entity,
    Metric,
  },

  data() {
    return {
      // Category
      currentCategory: 0,
      categories: [{
        name: 'Category 1',
      },
      {
        name: 'Category 2',
      },
      {
        name: 'Category 3',
      },
      {
        name: 'Category 4',
      }],
      // Entity
      currentEntity: 0,
      entities: [{
        name: 'Entity 1',
      },
      {
        name: 'Entity 2',
      },
      {
        name: 'Entity 3',
      },
      {
        name: 'Entity 4',
      }],
      // Settings
      showSettings: false,
    };
  },

  sockets: {
    'entity:add': function () {
      console.log('Add entity');
    },

    'entity:remove': function () {
      console.log('Remove entity');
    },

    'entity:update': function () {
      console.log('Update entity');
    },
  },

  mounted() {
    // Load game assets
    AssetsManager.loader.addGroup({
      name: 'models',
      base: '/3d/models/',
      files: Reborn.models.map(({ slug }) => ({
        name: slug,
        path: `${slug}.glb`,
      })),
    });

    AssetsManager.loader.on('load:models', () => {
      this.$socket.emit('player:ready');

      // If server don't enabled launch game
      if (!config.server.enabled) {
        GameHelpers.simulateNewGame.call(this);
      }
    });

    AssetsManager.loader.loadGroup('models');

    document.addEventListener('keydown', this.addShortcuts);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.addShortcuts);
  },

  methods: {
    addShortcuts(e) {
      this.categoriesShortcuts(e);
      this.entitiesShortcuts(e);
      this.settingsShortcut(e);
      this.fullscreenShortcurt(e);
    },
    keyHasShortcut(e, keyCodes) {
      const currentKeyCode = e.which;
      const keyIndex = keyCodes.indexOf(currentKeyCode);

      if (keyIndex >= 0) {
        return keyIndex;
      }
    },
    categoriesShortcuts(e) {
      const keyCodes = [112, 113, 114, 115];
      const categoryIndex = this.keyHasShortcut(e, keyCodes);

      if (categoryIndex >= 0) this.setCurrentCategory(categoryIndex);
    },
    entitiesShortcuts(e) {
      const keyCodes = [49, 50, 51, 52];
      const entityIndex = this.keyHasShortcut(e, keyCodes);

      if (entityIndex >= 0) this.setCurrentEntity(entityIndex);
    },
    settingsShortcut(e) {
      if (e.which === 27) this.showSettings = !this.showSettings;
    },
    fullscreenShortcurt(e) {
      if (e.which === 70) {
        const elem = document.documentElement;

        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      }
    },
    setCurrentCategory(index) {
      this.currentCategory = index;
    },
    setCurrentEntity(index) {
      // TODO: Update 3D asset
      this.currentEntity = index;
    },
    onWebGLInit() {
      this.$webgl.on('addItem', (item) => {
        this.$socket.emit('entity:add', {
          ...item,
          model: 'house'
        });
        console.log(item);
      });
    },
  },

};
</script>

<style lang="scss">
.game {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &__interface {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    & > div {
      position: absolute;
    }

    .metrics {
      top: 0;
      left: 0;
    }

    .years-counter {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .indicators {
      top: 0;
      right: 0;
    }

    .inventory {
      bottom: 0;
      left: 0;
      padding: 10px;
      width: 400px;
      border-radius: 50px;
      background-color: rgba(getColor(basics, white), .5);

      .categories {
        @include useFlex(space-between);
        position: absolute;
        top: 0;
        left: 35px;
        transform: translateY(-100%);
      }

      .entities {
        @include useFlex(space-between);
      }
    }

    .settings-cta {
      $size: 80px;

      bottom: 0;
      right: 0;
      @include useFlex();
      width: $size;
      height: $size;
      background-color: getColor(basics, white);
      border-radius: 50%;
    }
  }
}
</style>
