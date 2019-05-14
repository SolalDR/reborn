import * as RebornCore from '../../../server/reborn';
import Game from './Game';

const Reborn = Object.assign({}, RebornCore);
Reborn.Game = Game;

export default Reborn;
