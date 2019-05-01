/**
 * Represent a notification
 * @param {string} id
 */
class Notification {
  constructor({
    name = null,
    content = null,
    targetRole = null,
    constraints = {}
  }) {
    this.name = name;
    this.content = content;
    this.targetRole = targetRole;
    this.constraints = constraints
  }

  /**
   * Returns infos
   * @returns {name: string, content: string, targetRole: Role, constraints: Object}
   */
  get infos(){
    return {
      name: this.name,
      content: this.content,
      targetRole: this.targetRole ? this.targetRole.name : null,
      constraints: this.constraints
    };
  }
}

export default Notification;
