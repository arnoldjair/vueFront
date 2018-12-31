<template>
  <div>ytfytf</div>
</template>

<script>
import { indexedDB } from '@/components/mixins/indexedDB'
export default {
  name: 'User',
  mixins: [indexedDB],
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    this.loadUser(this.$route.params.id)
  },
  methods: {
    loadUser (id) {
      this.getUser(id).then(data => {
        this.currUser = data
        this.currUser.fullName =
          data.nombre.nombre +
          ' ' +
          data.nombre.apellido1 +
          ' ' +
          data.nombre.apellido2
        this.currUser.genero =
          this.currUser.genero === 'M' ? 'Masculino' : 'Femenino'
        this.currUser.direccion =
          'Calle ' +
          this.currUser.direccion.calle +
          ', ' +
          'Número ' +
          this.currUser.direccion.numero +
          ', ' +
          'Puerta ' +
          this.currUser.direccion.puerta +
          ', ' +
          'Código postal ' +
          this.currUser.direccion.codigoPostal +
          ', ' +
          'ciudad ' +
          this.currUser.direccion.ciudad
      })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
