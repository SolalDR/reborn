export default {
  authenticate(mdp){
    if( mdp === process.env.MDP ){
      return true;
    }
    return false;
  }
}
