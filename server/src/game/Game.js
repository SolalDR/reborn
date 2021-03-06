import * as Reborn from '../../reborn';

import ConstraintManager from './constraint/Manager';
import NotificationManager from './notification/Manager';
import SkillsManager from './skills/Manager';
import World from './World';
import Timeline from './timeline/Timeline';
import config from '../config';

export default class Game extends Reborn.Game {
  constructor({
    players,
    socket,
    room,
  } = {}) {
    super({
      players,
    });
    this.room = room;
    this.socket = socket;
    this.assignRoles();

    // Timeline
    this.timeline = new Timeline({
      interval: config.timeline.interval,
    });

    // ConstraintManager
    this.constraintManager = new ConstraintManager({
      game: this,
    });

    // NotificationManager
    this.notificationManager = new NotificationManager({
      game: this,
    });

    this.skillsManager = new SkillsManager({
      game: this,
    });

    const metricsMap = Array.from(this.metrics.values());
    this.timeline.on('tick', () => {
      this.constraintManager.checkConstraints();

      this.metrics.forEach((metric) => {
        metric.value += metric.recurentOperation * config.timeline.ratio * config.metrics.ratio;
      });

      this.metrics.forEach(metric => metric.applyRecurentLogic(this));
      this.emit('tick', {
        metrics: metricsMap.map(m => m.infos),
        elapsed: Date.now() - this.startedAt,
      });
    });

    this.initEvents();
  }

  /**
   * @override
   */
  initWorld() {
    this.world = new World({
      game: this,
    });
  }

  initEvents() {
    this.constraintManager.get('rythm-fast').on('change', ({ regularOrder }) => {
      this.emit('rythm:change', regularOrder ? 'fast' : 'medium');
    });

    this.constraintManager.get('rythm-medium').on('change', ({ regularOrder }) => {
      this.emit('rythm:change', regularOrder ? 'medium' : 'slow');
    });

    this.constraintManager.get('end-game').on('change', (args) => {
      let reason;

      const endGameMetrics = ['biodiversity', 'energy', 'food', 'purity', 'satisfaction'];
      endGameMetrics.forEach((metricSlug) => {
        if (this.metrics.get(metricSlug).value === 0) reason = metricSlug;
      });

      this.finish(reason);
      this.timeline.stop();
    });
  }

  start() {
    super.start();
    this.startedAt = Date.now() + 7000;

    const timeout = this.startedAt - Date.now();
    setTimeout(() => {
      this.timeline.start();
    }, timeout);
  }

  assignRoles() {
    const playersList = this.playersList;
    const playerNature = this.players.get(playersList.map(p => p.id)[Math.floor(Math.random() * 2)]);
    playerNature.assignRole(Reborn.NatureRole);

    const playerCity = playersList.find(p => p.id !== playerNature.id);
    playerCity.assignRole(Reborn.CityRole);
  }
}
