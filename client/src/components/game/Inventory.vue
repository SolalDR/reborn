<template>
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
</template>

<script>
import Entity from './Entity.vue';
import Category from './Category.vue';

export default {
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
      entities: [
        {
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
        },
      ],
    };
  },

  components: {
    Category,
    Entity,
  },

  mounted() {
    this.$bus.$on('shortcut', (key) => {
      this.categoriesShortcuts(key);
      this.entitiesShortcuts(key);
    });
  },

  methods: {
    keyHasShortcut(keyPress, keyCodes) {
      const keyIndex = keyCodes.indexOf(keyPress);
      return keyIndex;
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

    setCurrentCategory(index) {
      this.currentCategory = index;
    },

    setCurrentEntity(index) {
      // TODO: Update 3D asset
      this.currentEntity = index;
    },
  },
};
</script>

<style lang="scss">
.inventory {
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
</style>
