/**
 * @param {String} name The name availables are 'creation', 'mounted', 'destruction', 'living'
 * @param {Number} duration The duration before the state will be expired
 * @param {Modifier} entry
 */
class EntityState {
  constructor({
    name = null,
    duration = null,
    enterModifiers = [],
    recurModifiers = [],
    leaveModifiers = []
  }){
    this.name = name;
    this.duration = duration;
    if (EntityState.LIST.indexOf(this.name) < 0) {
      console.error(`EntityState: The state with name "${this.name}" is not defined`);
      return null;
    }

    this.enterModifiers = enterModifiers;
    this.recurModifiers = recurModifiers;
    this.leaveModifiers = leaveModifiers;
  }
  
  applyEnterModifiers(){
    this.enterModifiers.forEach(modifier => {

    })
  }

  applyRecursModifiers(){

  }
  
  applyLeaveModifiers(){

  }
}

EntityState.LIST = ["creation", "mounted", "destruction", "living"];

export default EntityState;