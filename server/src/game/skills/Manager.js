import Emitter from "@solaldr/emitter";
import { Skill } from '../../../reborn';
import skills from '../../../reborn/skills';
import skillsConstructors from './index';


export default class SkillsManager extends Emitter {
  constructor({
    game = null
  } = {}) {
    super();
    this.skills = new Map();

    skills.forEach(skillInfos => {
      const skillConstructor = skillsConstructors[skillInfos.slug]
        ? skillsConstructors[skillInfos.slug]
        : Skill

      const skill = new skillConstructor(skillInfos);

      if (skill.constraint) {
        const constraint = game.constraintManager.get(skill.constraint);
        if (!constraint) {
          console.warn(`SkillsManager: There is no constraint with name: "${skill.constraint}"`);
          return;
        }

        constraint.on('change', ({ regularOrder }) => {
          skill.allowedConstraint = regularOrder === skill.regularConstraintOrder;
          skill.checkAvailable();
        })

        skill.on('available', () => this.emit('skill:available', skill.slug));
        skill.on('unavailable', () => this.emit('skill:unavailable', skill.slug));
        skill.on('start', () => this.emit('skill:start', skill.slug));

        this.skills.set(skill.slug, skill);
      }
    })
  }
}
