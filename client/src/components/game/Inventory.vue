<template>
  <transition name="fade-scale" appear>
    <div class="inventory">
      <div class="inventory__categories">
        <category
          v-for="(category, index) in categories"
          :key="`category-${index}`"
          :category="{index: index, ...category}"
          :is-current="category.slug === currentCategory.slug"
          @setCurrentCategory="setCurrentCategory(category)"/>
      </div>

      <div class="inventory__list">
        <model
          v-for="(model, index) in models"
          :key="`model-${index}`"
          :model="{index: index, ...model}"
          :money="money"
          :is-current="model.name === currentModel.name"
          @setCurrentModel="setCurrentModel"
          @setHoveredModel="setHoveredModel"/>

        <skill
          v-for="(skill, index) in skills"
         :key="`skill-${index}`"
         :skill="{index: index, ...skill}"
         :is-current="skill.slug === currentSkill.slug"
         @setCurrentSkill="setCurrentSkill(skill)"/>
      </div>
    </div>
  </transition>
</template>

<script>
import Model from './Model.vue';
import Skill from './Skill.vue';
import Category from './Category.vue';
import Reborn from '../../game';

export default {
  name: 'inventory',

  props: {
    money: Number,
  },

  data() {
    return {
      currentCategory: 0,
      categories: [],
      currentModel: 0,
      hoveredModel: 0,
      models: [],
      currentSkill: 0,
      skills: [],
    };
  },

  components: {
    Category,
    Model,
    Skill,
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

    if (this.models[0]) {
      this.setCurrentModel(this.models[0]);
    }
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
      this.models = Array.from(this.$game.entityModels.values()).filter((model) => {
        return model.role === this.$game.player.role.name
          && model.category === this.currentCategory.slug;
      });

      this.skills = Reborn.skills.filter((skill) => {
        return skill.role === this.$game.player.role.name
          && skill.category === this.currentCategory.slug;
      });

      this.$emit('selectCategory', this.currentCategory);
    },

    setCurrentModel(model) {
      this.currentModel = model;
      this.$webgl.map.gridHelper.setSize(this.currentModel.size[0], this.currentModel.size[1]);
      this.$emit('selectModel', this.currentModel);
    },

    setHoveredModel(model) {
      this.hoveredModel = model;
      this.$emit('hoveredModel', this.hoveredModel);
    },

    setCurrentSkill(skill) {
      this.currentSkill = skill;
      this.$emit('selectSkill', this.currentSkill);
    },
  },
};
</script>

<style lang="scss">
.inventory {
  padding: 1rem 2rem;
  height: 7.5rem;
  border-radius: 2.5rem;
  border: 2px solid getColor(basics, black);
  background-color: rgba(getColor(basics, white), .5);

  &__categories {
    overflow: hidden;
    @include useFlex(space-between);
    position: absolute;
    top: 0;
    left: 2.2rem;
    transform: translateY(-100%);
    padding: 0 .5rem;
    background-color: rgba(getColor(basics, white), .7);
    border: 2px solid getColor(basics, black);
    border-top-left-radius: 2.5rem;
    border-top-right-radius: 2.5rem;
  }

  &__list {
    @include useFlex(flex-start);

    .model,
    .skill {
      img {
        margin-right: 2rem;
      }

      &:last-of-type {
        img {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
