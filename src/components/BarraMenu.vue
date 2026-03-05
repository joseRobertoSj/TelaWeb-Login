<template>
  <v-app-bar elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Meu Painel</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-check-circle-outline"></v-btn>

      <v-btn icon>
        <v-badge color="error" content="2">
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>

      <v-divider vertical class="mx-2"></v-divider>

      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="primary" size="36">
              <span class="text-white text-caption">US</span>
            </v-avatar>
          </v-btn>
        </template>
        
        <v-list min-width="200">
          <v-list-item prepend-icon="mdi-account-outline" title="Meu Perfil"></v-list-item>
          <v-divider class="my-2"></v-divider>
          <v-list-item prepend-icon="mdi-logout" title="Sair" color="error"></v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>