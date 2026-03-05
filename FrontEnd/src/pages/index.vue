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
                <!-- Alerta de Sucesso -->
                <v-alert v-if="mensagemSucesso" type="success" closable class="mb-4">
                  {{ mensagemSucesso }}
                </v-alert>

                <!-- Alerta de Erro -->
                <v-alert v-if="mensagemErro" type="error" closable class="mb-4">
                  {{ mensagemErro }}
                </v-alert>

                <v-form @submit.prevent="realizarLogin">

                  <v-text-field v-model="username" label="Usuário ou E-mail" prepend-inner-icon="mdi-account-outline"
                    :rules="regrasUsername" variant="outlined" color="#0F52BA" base-color="#0F52BA" class="mb-3 mt-4"
                    hint="Exemplo: usuario@navarromed.com.br" required></v-text-field>

                  <v-text-field v-model="password" label="Senha" prepend-inner-icon="mdi-lock-outline"
                    :rules="regrasSenha" :type="mostrarSenha ? 'text' : 'password'"
                    :append-inner-icon="mostrarSenha ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="mostrarSenha = !mostrarSenha" variant="outlined" color="#0F52BA"
                    base-color="#0F52BA" required></v-text-field>

                  <div class="d-flex justify-end mt-n2 mb-4">
                    <a href="#" class="text-caption text-decoration-none" style="color: #0F52BA;">Esqueceu a senha?</a>
                  </div>

                  <v-btn type="submit" block size="large" :disabled="carregando || !username || !password"
                    :loading="carregando" class="mt-6 text-black font-weight-bold text-none rounded-pill"
                    style="background: linear-gradient(135deg, #0F52BA 0%, #0F52BA 100%);">
                    {{ carregando ? 'Entrando...' : 'Entrar na Rede' }}
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
                src="https://images.unsplash.com/photo-1494412552100-42e4e7a74ec6?q=80&w=1600&auto=format&fit=crop"
                cover>
                <div class="d-flex flex-column align-center justify-end fill-height pa-12 pb-16"
                  style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%);">
                  <div class="text-h3 font-weight-bold text-white text-center pb-3">Análise Avançada de Dados</div>
                  <div class="text-h6 text-grey-lighten-2 text-center max-width-600">Visualizações neurais para insights
                    mais rápidos e precisos.</div>
                </div>
              </v-carousel-item>

              <v-carousel-item
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1600&auto=format&fit=crop"
                cover>
                <div class="d-flex flex-column align-center justify-end fill-height pa-12 pb-16"
                  style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%);">
                  <div class="text-h3 font-weight-bold text-white text-center pb-3">Integração Ágil e Segura</div>
                  <div class="text-h6 text-grey-lighten-2 text-center max-width-600">Conecte equipes e ferramentas em um
                    ecossistema protegido.</div>
                </div>
              </v-carousel-item>

              <v-carousel-item
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop"
                cover>
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
import { useRouter } from 'vue-router'
import { apiService } from '@/services/api'

const router = useRouter()

const username = ref('')
const password = ref('')
const mostrarSenha = ref(false)
const carregando = ref(false)
const mensagemErro = ref('')
const mensagemSucesso = ref('')

// Regras de validação
const regrasUsername = [
  v => !!v || 'Usuário ou e-mail é obrigatório',
  v => /^[^@]+@navarromed\.com\.br$/.test(v) || 'Use seu e-mail corporativo @navarromed.com.br'
]

const regrasSenha = [
  v => !!v || 'Senha é obrigatória',
  v => (v && v.length >= 6) || 'A senha deve ter no mínimo 6 caracteres'
]

const realizarLogin = async () => {
  if (!username.value || !password.value) {
    mensagemErro.value = 'Por favor, preencha todos os campos'
    return
  }

  carregando.value = true
  mensagemErro.value = ''
  mensagemSucesso.value = ''

  try {
    const response = await apiService.login({
      username: username.value,
      password: password.value
    })

    console.log('Login realizado com sucesso!', response.user)

    // Mostrar mensagem de sucesso
    mensagemSucesso.value = `✅ Bem-vindo, ${response.user.nome}! Entrando no sistema...`

    // Limpar campos após sucesso
    username.value = ''
    password.value = ''

    // Redirecionar para dashboard ou página principal
    setTimeout(() => {
      router.push({ name: 'dashboard', replace: true }).catch(err => {
        console.log('Redirecionando para home...')
        window.location.href = '/dashboard'
      })
    }, 2000)

  } catch (error) {
    console.error('Erro ao fazer login:', error)

    // Mensagens de erro mais específicas
    if (error.message.includes('401') || error.message.includes('Invalid')) {
      mensagemErro.value = '❌ Usuário ou senha incorretos'
    } else if (error.message.includes('conexão')) {
      mensagemErro.value = '❌ Erro ao conectar com o servidor'
    } else {
      mensagemErro.value = error.message || '❌ Erro ao fazer login. Tente novamente.'
    }
  } finally {
    carregando.value = false
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