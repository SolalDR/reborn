export default {
  authenticate(mdp){
    console.log(this);
    if( mdp === process.env.MDP ){
      return true;
    }
    return false;
  }
}
