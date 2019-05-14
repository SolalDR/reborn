class Skill {
  constructor({
    size = [1, 1],
    epicenter = [0, 0],
    name = "",
    slug = null,
  } = {}) {
    this.name = name;
    this.slug = slug === null ? snakeCase(name) : slug;
    this.size = size;
    this.epicenter = epicenter;
  }
}

export default Skill;
