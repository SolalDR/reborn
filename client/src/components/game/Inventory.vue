<template>
  <div class="inventory">
    <div class="categories">
      <category v-for="(category, index) in categories"
                :key="`category-${index}`"
                :category="{index: index, ...category}"
                :is-current="category.slug === currentCategory.slug"
                @setCurrentCategory="setCurrentCategory(category)"/>
    </div>

    <div class="models">
      <model v-for="(model, index) in models"
             :key="`model-${index}`"
             :model="{index: index, ...model}"
             :money="money"
             :is-current="model.name === currentModel.name"
             @setCurrentModel="setCurrentModel(model)"/>
    </div>
  </div>
</template>

<script>
import Model from './Model.vue';
import Category from './Category.vue';
import Reborn from '../../game';

export default {
  name: 'inventory',

  props: {
    money: Number
  },

  data() {
    return {
      currentCategory: 0,
      categories: [],
      currentModel: 0,
      models: [],
    };
  },

  components: {
    Category,
    Model,
  },

  mounted() {
    this.$bus.$on('shortcut', (key) => {
      // this.categoriesShortcuts(key);
      // this.entitiesShortcuts(key);
    });

    this.categories = [];
    Object.keys(Reborn.categories).forEach((key) => {
      const category = Reborn.categories[key];
      if (category.role === this.$game.player.role.name) {
        this.categories.push(category);
      }
    });

    this.setCurrentCategory(this.categories[0]);
    this.setCurrentModel(this.models[0]);
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

    setCurrentCategory(category) {
      this.currentCategory = category;
      this.models = [];
      this.models = Reborn.models.filter((model) => {
        return model.role === this.$game.player.role.name
          && model.category === this.currentCategory.slug;
      });
      this.$emit('selectCategory', this.currentCategory);
    },

    setCurrentModel(model) {
      this.currentModel = model;
      this.$emit('selectModel', this.currentModel);
    },
  },
};
</script>

<style lang="scss">
.inventory {
  padding: 10px;
  width: 26.5rem;
  height: 7.5rem;
  border-radius: 2.5rem;
  border: 2px solid getColor(basics, black);
  background-color: rgba(getColor(basics, white), .5);

  .categories {
    overflow: hidden;
    @include useFlex(space-between);
    position: absolute;
    top: 0;
    left: 35px;
    transform: translateY(-100%);
    border: 2px solid getColor(basics, black);
    border-top-left-radius: 2.5rem;
    border-top-right-radius: 2.5rem;
  }

  .models {
    @include useFlex(space-between);
  }
}
</style>
