import Reborn from '../../game';

export default {
  simulateNewGame() {
    this.$store.commit('SOCKET_game:create', {
      players: [
        {
          id: 1,
          role: 'nature',
          status: Reborn.Player.ACTIVE,
        },
        {
          id: 1,
          role: 'nature',
          status: Reborn.Player.ACTIVE,
        },
      ],
      seed: Math.random(),
    });
  },
};
