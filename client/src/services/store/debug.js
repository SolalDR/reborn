export default {
  namespaced: true,
  state: {
    messages: [],
    labels: {
      default: {
        color: 'black',
      },

      socket: {
        color: 'blue',
      },

      bus: {
        color: 'green',
      },

      webgl: {
        color: 'purple',
      },
    },
  },

  mutations: {
    /**
     * @param {string} message
     * @param {string} label
     * @param {number} importance
     */
    log(state, {
      content = null,
      label = 'default',
      importance = 1,
    } = {}) {
      if (content) {
        state.messages.unshift({
          content,
          label,
          importance,
        });
      }
    },
  },
};
