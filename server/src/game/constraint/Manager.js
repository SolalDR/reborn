import Emitter from '../../../../reborn/utils/Emitter';

class ConstraintManager extends Emitter {
  constructor({
    game = null
  }) {
    super();
    this.game = game;
  }

  checkConstraints(constraints) {
    console.log('--------------');
    console.log(constraints);
    console.log('--------------');

    // TODO: Emit 'notification:trigger' on constraint validation for notification
  }

  get infos(){
    return {
      game: this.game
    };
  }
}

export default ConstraintManager;
