import Emitter from "@solaldr/emitter";

class Constraint extends Emitter {
  constructor({
    slug = null,
    test = () => console.warn('Constraint: No test is registered in this constraint.')
  }) {
    super();
    this.slug = slug;
    this.test = test.bind(this);
    this.changed = false;
    this.value = null;
  }

  check(game, discret = false) {
    var newValue = this.test(game);
    this.changed = (this.value === newValue) ? false : true;
    this.value = newValue;
    if(this.changed && !discret) {
      this.emit('change', {
        regularOrder: this.value
      });
    }
  }
}

export default Constraint;
