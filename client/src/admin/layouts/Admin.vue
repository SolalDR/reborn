<template>
  <div class="admin layout admin-layout md-primary">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{ title }}</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Menu
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>videogame_asset</md-icon>
            <span class="md-list-item-text">Rooms</span>
          </md-list-item>

          <md-list-item>
            <md-icon>business</md-icon>
            <span class="md-list-item-text">Models</span>
          </md-list-item>

          <md-list-item>
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">Config</span>
          </md-list-item>

          <md-list-item>
            <md-icon>av_timer</md-icon>
            <span class="md-list-item-text">Logs</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <slot/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {
    title: {
      type: String,
      default: 'Admin',
    },
  },
  data() {
    return {
      sending: false,
      form: {
        username: {
          value: '',
        },
        password: {
          value: '',
        },
      },
    };
  },
};
</script>
