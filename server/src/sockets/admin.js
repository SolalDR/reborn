import Bus from "./../Bus";
process.token = '1234';

export default {
  authenticate(mdp){
    if( mdp === process.env.MDP ){
      this.emit('admin:authenticate', {
        valid: true,
        token: process.token
      });
      return;
    }
    this.emit('admin:authenticate', {
      valid: false,
      token: null
    });

  }
}
