/**
 * Exemplo de implementação do serviço de API no componente de Login
 * 
 * Este é um exemplo de como usar o apiService criado em src/services/api.ts
 * Copie e adapte conforme necessário para seu projeto Vue 3 + TypeScript
 */

// ============================================
// EXEMPLO PARA: src/pages/index.vue (Login)
// ============================================

// <template>
//   <v-app theme="dark" class="bg-black">
//     <v-main>
//       <v-container fluid class="fill-height pa-0">
//         <v-row no-gutters align="center" class="fill-height">
//           <v-col cols="12" md="6" lg="5" class="d-flex flex-column align-center justify-center fill-height"
//             style="background-color: #0d0d0d; border-right: 1px solid #1a1a1a;">
//             
//             <div class="text-center mb-10 mt-n10">
//               <v-icon size="64" color="#0F52BA">mdi-robot-outline</v-icon>
//               <div class="text-h4 font-weight-bold" style="color: #0F52BA;">Neural Core</div>
//               <div class="text-subtitle-1 text-grey-darken-1">Acesse sua plataforma neural</div>
//             </div>

//             <v-card width="100%" max-width="400" flat class="pa-8 rounded-lg"
//               style="background-color: #121212; border: 1px solid #1a1a1a;">
//               <v-card-title class="text-center text-h5 font-weight-bold pb-2">
//                 Acesso Seguro
//               </v-card-title>

//               <v-card-text>
//                 <!-- Mensagem de erro -->
//                 <v-alert
//                   v-if="mensagemErro"
//                   type="error"
//                   closable
//                   class="mb-4"
//                 >
//                   {{ mensagemErro }}
//                 </v-alert>

//                 <v-form @submit.prevent="realizarLogin">
//                   <v-text-field
//                     v-model="username"
//                     label="Usuário ou E-mail"
//                     prepend-inner-icon="mdi-account-outline"
//                     variant="outlined"
//                     color="#0F52BA"
//                     base-color="#0F52BA"
//                     class="mb-3 mt-4"
//                     required
//                     :disabled="carregando"
//                   ></v-text-field>

//                   <v-text-field
//                     v-model="password"
//                     label="Senha"
//                     prepend-inner-icon="mdi-lock-outline"
//                     :type="mostrarSenha ? 'text' : 'password'"
//                     :append-inner-icon="mostrarSenha ? 'mdi-eye-off' : 'mdi-eye'"
//                     @click:append-inner="mostrarSenha = !mostrarSenha"
//                     variant="outlined"
//                     color="#0F52BA"
//                     base-color="#0F52BA"
//                     required
//                     :disabled="carregando"
//                   ></v-text-field>

//                   <div class="d-flex justify-end mt-n2 mb-4">
//                     <a href="#" class="text-caption text-decoration-none" style="color: #0F52BA;">Esqueceu a senha?</a>
//                   </div>

//                   <v-btn
//                     type="submit"
//                     block
//                     size="large"
//                     class="mt-6 text-black font-weight-bold text-none rounded-pill"
//                     style="background: linear-gradient(135deg, #0F52BA 0%, #0F52BA 100%);"
//                     :loading="carregando"
//                     :disabled="carregando || !username || !password"
//                   >
//                     {{ carregando ? 'Entrando...' : 'Entrar na Rede' }}
//                   </v-btn>

//                 </v-form>
//               </v-card-text>
//             </v-card>

//             <div class="text-center mt-8 text-caption text-grey-darken-1">
//               Não tem conta?
//               <router-link to="/cadastro" class="text-decoration-none font-weight-bold" style="color: #0F52BA;">
//                 Criar acesso
//               </router-link>
//             </div>

//           </v-col>

//           <!-- Carousel omitido para brevidade -->

//         </v-row>
//       </v-container>
//     </v-main>
//   </v-app>
// </template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '@/services/api'

const router = useRouter()

// State
const username = ref('')
const password = ref('')
const mostrarSenha = ref(false)
const carregando = ref(false)
const mensagemErro = ref('')

// Realizar login
async function realizarLogin() {
  if (!username.value || !password.value) {
    mensagemErro.value = 'Por favor, preencha todos os campos'
    return
  }

  carregando.value = true
  mensagemErro.value = ''

  try {
    const response = await apiService.login({
      username: username.value,
      password: password.value
    })

    console.log('Login bem-sucedido:', response.user)

    // Redirecionar para dashboard ou página principal
    router.push({ name: 'dashboard' }) // Ajuste conforme sua rota

  } catch (error: any) {
    console.error('Erro ao fazer login:', error)
    mensagemErro.value = error.message || 'Erro ao fazer login. Verifique suas credenciais.'
  } finally {
    carregando.value = false
  }
}
</script>

// ============================================
// EXEMPLO PARA: src/pages/cadastro.vue (Register)
// ============================================

// <template>
// ... (formulário similar, mas com campos adicionais)
// </template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '@/services/api'

const router = useRouter()

// State
const nome = ref('')
const email = ref('')
const cargo = ref(null)
const senha = ref('')
const confirmarSenha = ref('')
const mostrarSenha = ref(false)
const carregando = ref(false)
const mensagemErro = ref('')
const formularioValido = ref(false)

const listaCargos = [
  'Desenvolvedor',
  'Designer',
  'Gerente',
  'Analista',
  'Outro'
]

// Rules de validação
const regrasNome = [
  (v: string) => !!v || 'Nome é obrigatório',
  (v: string) => v.length >= 3 || 'Nome deve ter pelo menos 3 caracteres'
]

const regrasUsuario = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email inválido'
]

const regrasCargo = [
  (v: string) => !!v || 'Cargo é obrigatório'
]

const regrasSenha = [
  (v: string) => !!v || 'Senha é obrigatória',
  (v: string) => v.length >= 6 || 'Senha deve ter pelo menos 6 caracteres'
]

const regrasConfirmarSenha = [
  (v: string) => !!v || 'Confirmação de senha é obrigatória',
  (v: string) => v === senha.value || 'As senhas não coincidem'
]

// Realizar cadastro
async function realizarCadastro() {
  if (!formularioValido.value) {
    mensagemErro.value = 'Por favor, preencha todos os campos corretamente'
    return
  }

  carregando.value = true
  mensagemErro.value = ''

  try {
    const response = await apiService.register({
      nome: nome.value,
      email: email.value,
      cargo: cargo.value,
      senha: senha.value,
      confirmar_senha: confirmarSenha.value
    })

    console.log('Cadastro bem-sucedido:', response)

    // Redirecionar para login
    router.push({
      name: 'login',
      params: { email: email.value }
    })

  } catch (error: any) {
    console.error('Erro ao fazer cadastro:', error)
    mensagemErro.value = error.message || 'Erro ao fazer cadastro. Tente novamente.'
  } finally {
    carregando.value = false
  }
}
</script>

// ============================================
// EXEMPLO PARA: src/middleware/auth.ts (Proteção de rotas)
// ============================================

/*
import { useRouter } from 'vue-router'
import { apiService, authStore } from '@/services/api'

export function setupAuthGuard(router: any) {
  router.beforeEach(async (to: any, from: any, next: any) => {
    // Rotas públicas que não requerem autenticação
    const publicRoutes = ['login', 'cadastro']

    if (publicRoutes.includes(to.name)) {
      // Se já está logado, redirecione para dashboard
      if (authStore.isAuthenticated()) {
        next({ name: 'dashboard' })
      } else {
        next()
      }
    } else {
      // Rotas protegidas
      if (authStore.isAuthenticated()) {
        try {
          // Validar token chamando o endpoint /auth/me
          await apiService.getCurrentUser()
          next()
        } catch (error) {
          // Token inválido ou expirado
          authStore.logout()
          next({ name: 'login' })
        }
      } else {
        // Sem autenticação, redirecionar para login
        next({ name: 'login' })
      }
    }
  })
}
*/
</script>

// ============================================
// INSTALAÇÃO
// ============================================

/*
1. Copie o arquivo `src/services/api.ts` para seu projeto FrontEnd

2. Copie o arquivo `.env.development` para FrontEnd/

3. Atualize seu main.ts:

import { setupAuthGuard } from '@/middleware/auth'
import { createRouter, createWebHistory } from 'vue-router'

// ... suas rotas

const router = createRouter({
  history: createWebHistory(),
  routes
})

setupAuthGuard(router)

app.use(router)

4. Use apiService em seus componentes!
*/
