export default class Player {
  constructor(clientSocket){
    this._client = clientSocket;
    this.id = this._client.id;
    this.role;
  }

  assignRole(role){
    this.role = role;
  }

  get infos(){
    return {
      id: this.id,
      role: this.role
    }
  }
}