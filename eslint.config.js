import vuetify from 'eslint-config-vuetify'

export default vuetify({
  ts: true,
  rules: {
      "indent": "off",                  // Desativa verificação de espaços no JS
      "vue/html-indent": "off",         // Desativa verificação de espaços no HTML/Template
      "vue/script-indent": "off",       // Desativa verificação de espaços na tag <script>
      "@typescript-eslint/indent": "off"
})
