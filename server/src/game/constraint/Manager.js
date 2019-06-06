import Emitter from '@solaldr/emitter';
import Constraint from './Constraint';
import constraints from './list';

/**
 * @extends Emitter
 * @class ConstraintManager
 */
class ConstraintManager extends Emitter {
  constructor({
    game = null,
  } = {}) {
    super();
    this.game = game;
    this.constraints = new Map();
    constraints.forEach((constraint) => {
      this.constraints.set(constraint.slug, new Constraint(constraint));
    });

    this.checkConstraints(true);
  }

  /**
   * Check all the constraint, this method is called in the timeline:tick
   */
  checkConstraints(discret = false) {
    this.constraints.forEach((constraint) => {
      constraint.check(this.game, discret);
    });
  }

  get(constraintName) {
    return this.constraints.get(constraintName);
  }

  get infos() {
    return {
      game: this.game,
    };
  }
}

export default ConstraintManager;
