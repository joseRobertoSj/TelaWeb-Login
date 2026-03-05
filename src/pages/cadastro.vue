<template>
    <v-app theme="dark" class="bg-black">
        <v-main>
            <v-container fluid class="fill-height pa-0">
                <v-row no-gutters align="center" class="fill-height">

                    <v-col cols="12" md="6" lg="5" class="d-flex flex-column align-center justify-center fill-height"
                        style="background-color: #0d0d0d; border-right: 1px solid #1a1a1a;">

                        <div class="text-center mb-8 mt-n6">
                            <v-icon size="64" color="#0F52BA">mdi-account-plus-outline</v-icon>
                            <div class="text-h4 font-weight-bold" style="color: #0F52BA;">Nova Conta</div>
                            <div class="text-subtitle-1 text-grey-darken-1">Junte-se à nossa plataforma neural</div>
                        </div>
                        <v-card width="100%" max-width="450" flat class="pa-8 rounded-lg"
                            style="background-color: #121212; border: 1px solid #1a1a1a;">
                            <v-card-text>
                                <v-form v-model="formularioValido" @submit.prevent="realizarCadastro">

                                    <v-text-field v-model="nome" :rules="regrasNome" label="Nome Completo"
                                        prepend-inner-icon="mdi-card-account-details-outline" variant="outlined"
                                        color="#0F52BA" base-color="#0F52BA" class="mb-2" required></v-text-field>

                                    <v-text-field v-model="email" :rules="regrasEmail" label="E-mail"
                                        prepend-inner-icon="mdi-email-outline" variant="outlined" color="#0F52BA"
                                        base-color="#0F52BA" class="mb-2" type="email" required></v-text-field>

                                    <v-select v-model="cargo" :items="listaCargos" :rules="regrasCargo" label="Cargo"
                                        prepend-inner-icon="mdi-briefcase-outline" variant="outlined" color="#0F52BA"
                                        base-color="#0F52BA" class="mb-2" required></v-select>

                                    <v-row>
                                        <v-col cols="12" sm="6" class="pb-0">
                                            <v-text-field v-model="senha" :rules="regrasSenha" label="Senha"
                                                prepend-inner-icon="mdi-lock-outline"
                                                :type="mostrarSenha ? 'text' : 'password'" variant="outlined"
                                                color="#0F52BA" base-color="#0F52BA" required></v-text-field>
                                        </v-col>

                                        <v-col cols="12" sm="6" class="pb-0">
                                            <v-text-field v-model="confirmarSenha" :rules="regrasConfirmarSenha"
                                                label="Confirmar Senha" prepend-inner-icon="mdi-lock-check-outline"
                                                :type="mostrarSenha ? 'text' : 'password'"
                                                :append-inner-icon="mostrarSenha ? 'mdi-eye-off' : 'mdi-eye'"
                                                @click:append-inner="mostrarSenha = !mostrarSenha" variant="outlined"
                                                color="#0F52BA" base-color="#0F52BA" required></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-btn type="submit" block size="large" :disabled="!formularioValido"
                                        class="mt-6 text-white font-weight-bold text-none rounded-pill"
                                        style="background: linear-gradient(135deg, #0F52BA 0%, #0a3d8c 100%);">
                                        Registrar
                                    </v-btn>

                                </v-form>
                            </v-card-text>
                        </v-card>

                        <div class="text-center mt-8 text-caption text-grey-darken-1">
                            Já possui uma conta?
                            <router-link to="/" class="text-decoration-none font-weight-bold" style="color: #0F52BA;">
                                Fazer Login
                            </router-link>
                        </div>

                    </v-col>

                    <v-col cols="12" md="6" lg="7" class="fill-height pa-0 d-none d-md-flex">
                        <v-carousel cycle interval="5000" height="100%" hide-delimiter-background show-arrows="hover"
                            class="w-100 h-100">
                            <v-carousel-item
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop"
                                cover>
                                <div class="d-flex flex-column align-center justify-end fill-height pa-12 pb-16"
                                    style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%);">
                                    <div class="text-h3 font-weight-bold text-white text-center pb-3">Sistemas
                                        Inteligentes</div>
                                    <div class="text-h6 text-grey-lighten-2 text-center max-width-600">Construa o futuro
                                        com arquiteturas escaláveis.</div>
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

const formularioValido = ref(false)
const nome = ref('')
const email = ref('')
const cargo = ref(null) // Variável para armazenar o cargo selecionado
const senha = ref('')
const confirmarSenha = ref('')
const mostrarSenha = ref(false)

// Lista de opções que vai aparecer no dropdown
const listaCargos = [
    'Industria',
    'Gestão',
    'TI',
    'Financeiro',
    'Administrador(a)'
]

const regrasNome = [
    v => !!v || 'O nome é obrigatório',
    v => (v && v.length >= 3) || 'O nome deve ter pelo menos 3 caracteres'
]

const regrasEmail = [
    v => !!v || 'O e-mail é obrigatório',
    v => /.+@.+\..+/.test(v) || 'Insira um e-mail válido'
]

// Regra para garantir que o usuário escolha um cargo
const regrasCargo = [
    v => !!v || 'Selecione um cargo'
]

const regrasSenha = [
    v => !!v || 'A senha é obrigatória',
    v => (v && v.length >= 6) || 'A senha deve ter no mínimo 6 caracteres'
]

const regrasConfirmarSenha = [
    v => !!v || 'Confirme sua senha',
    v => v === senha.value || 'As senhas não coincidem'
]

const realizarCadastro = async () => {
    if (!formularioValido.value) return

    try {
        const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome.value,
                email: email.value,
                cargo: cargo.value, // Enviando o cargo para a API
                senha: senha.value,
            }),
        })

        if (response.ok) {
            const data = await response.json()
            console.log('Usuário criado com sucesso:', data)
        } else {
            console.error('Erro ao criar usuário')
        }
    } catch (error) {
        console.error('Erro de conexão com o servidor:', error)
    }
}
</script>

<style>
.v-carousel__item {
    height: 100% !important;
}

.v-carousel__controls {
    bottom: 30px !important;
}
</style>