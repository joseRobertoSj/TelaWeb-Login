<template>
  <v-app theme="dark" class="bg-black">
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters align="center" class="fill-height">

          <v-col cols="12" md="6" lg="5" class="d-flex flex-column align-center justify-center fill-height"
            style="background-color: #0d0d0d; border-right: 1px solid #1a1a1a;">

            <div class="text-center mb-10 mt-n10">
              <v-img src="/logo.png" max-width="150" height="150" class="mx-auto"></v-img>
              <div class="text-subtitle-1 text-grey-darken-1">Acesse a plataforma de envios</div>
            </div>

            <v-card width="100%" max-width="400" flat class="pa-8 rounded-lg"
              style="background-color: #121212; border: 1px solid #1a1a1a;">
              <v-card-title class="text-center text-h5 font-weight-bold pb-2">
                Acesso Seguro
              </v-card-title>

              <v-card-text>
                <v-form @submit.prevent="realizarLogin">

                  <v-text-field v-model="username" label="Usuário ou E-mail" prepend-inner-icon="mdi-account-outline"
                    variant="outlined" color="#0F52BA" base-color="#0F52BA" class="mb-3 mt-4" required></v-text-field>

                  <v-text-field v-model="password" label="Senha" prepend-inner-icon="mdi-lock-outline"
                    :type="mostrarSenha ? 'text' : 'password'"
                    :append-inner-icon="mostrarSenha ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="mostrarSenha = !mostrarSenha" variant="outlined" color="#0F52BA"
                    base-color="#0F52BA" required></v-text-field>

                  <div class="d-flex justify-end mt-n2 mb-4">
                    <a href="#" class="text-caption text-decoration-none" style="color: #0F52BA;">Esqueceu a senha?</a>
                  </div>

                  <v-btn type="submit" block size="large"
                    class="mt-6 text-black font-weight-bold text-none rounded-pill"
                    style="background: linear-gradient(135deg, #0F52BA 0%, #0F52BA 100%);">
                    Entrar na Rede
                  </v-btn>

                </v-form>
              </v-card-text>
            </v-card>

            <div class="text-center mt-8 text-caption text-grey-darken-1">
              Não tem conta?
              <router-link to="/cadastro" class="text-decoration-none font-weight-bold" style="color: #0F52BA;">
                Criar acesso
              </router-link>
            </div>

          </v-col>

          <v-col cols="12" md="6" lg="7" class="fill-height pa-0 d-none d-md-flex">
            <v-carousel cycle interval="6000" height="100%" hide-delimiter-background show-arrows="hover"
              class="w-100 h-100">
              <v-carousel-item
                src="https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1600&auto=format&fit=crop"
                cover>
                <div class="d-flex flex-column align-center justify-end fill-height pa-12 pb-16"
                  style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%);">
                  <div class="text-h3 font-weight-bold text-white text-center pb-3">Análise Avançada de Dados</div>
                  <div class="text-h6 text-grey-lighten-2 text-center max-width-600">Visualizações neurais para insights
                    mais rápidos e precisos.</div>
                </div>
              </v-carousel-item>

              <v-carousel-item
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop"
                cover>
                <div class="d-flex flex-column align-center justify-end fill-height pa-12 pb-16"
                  style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%);">
                  <div class="text-h3 font-weight-bold text-white text-center pb-3">Integração Ágil e Segura</div>
                  <div class="text-h6 text-grey-lighten-2 text-center max-width-600">Conecte equipes e ferramentas em um
                    ecossistema protegido.</div>
                </div>
              </v-carousel-item>

              <v-carousel-item
                src="https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?q=80&w=1600&auto=format&fit=crop" cover>
                <div class="d-flex flex-column align-center justify-end fill-height pa-12 pb-16"
                  style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%);">
                  <div class="text-h3 font-weight-bold text-white text-center pb-3">Expansão de Possibilidades</div>
                  <div class="text-h6 text-grey-lighten-2 text-center max-width-600">Escalabilidade para o seu núcleo
                    operacional e estratégico.</div>
                </div>
              </v-carousel-item>

            </v-carousel>
          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const mostrarSenha = ref(false)

const realizarLogin = async () => {
  try {
    const response = await fetch('http://localhost:8000/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: username.value,
        password: password.value,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Login realizado com sucesso! Token:', data.access_token)
    } else {
      console.error('Credenciais inválidas')
    }
  } catch (error) {
    console.error('Erro de conexão com o servidor backend:', error)
  }
}
</script>

<style>
/* Estilo sutil para garantir que o carrossel ocupe todo o espaço */
.v-carousel__item {
  height: 100% !important;
}

/* Centraliza os delimitadores do carrossel na parte inferior */
.v-carousel__controls {
  bottom: 30px !important;
}
</style>