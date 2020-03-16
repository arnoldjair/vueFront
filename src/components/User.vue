<template>
  <div class='row'>
    <div class="col-lg-6 offset-lg-3">
      <div class='card'>
        <div class='card-header'>
          <div>
            <h4>Nuevo usuario</h4>
          </div>
        </div>
        <div class='card-body'>
          <form name='newForm' id="newForm">
            <div class='form-group'>
              <label>Tipo</label>
              <select class='form-control' v-model='newUser.tipo'>
                <option value='paciente'>Paciente</option>
                <option value='profesional'>Profesional</option>
              </select>
            </div>
            <div class='form-group' v-if='newUser.tipo'>
              <label>
                <span v-if='newUser.tipo == "paciente"'>NHC</span>
                <span v-if='newUser.tipo == "profesional"'>N° tarjeta profesional</span>
                <span
                  class='text-danger'
                >Campo requerido</span>
              </label>
              <input type='text' class='form-control' v-model='newUser.id' name='id' required>
            </div>
            <div class='form-group'>
              <label>
                Nombre
              </label>
              <input
                type='text'
                class='form-control'
                v-model.trim='$v.newUser.nombre.$model'
                name='nombre'
                required
              >
              <div class="text-danger" v-if="!$v.newUser.nombre.required && $v.newUser.nombre.$dirty">Campo requerido</div>
            </div>
            <div class='form-group'>
              <label>
                Primer apellido
              </label>
              <input
                type='text'
                class='form-control'
                v-model='$v.newUser.primerApellido.$model'
                name='apellido1'
                required
              >
              <div class="text-danger" v-if="!$v.newUser.primerApellido.required && $v.newUser.primerApellido.$dirty">Campo requerido</div>
            </div>
            <div class='form-group'>
              <label>Segundo apellido</label>
              <input type='text' class='form-control' v-model='newUser.nombre.apellido2'>
            </div>
            <div class='form-group'>
              <label>Género</label>
              <select class='form-control' v-model='newUser.genero'>
                <option value='M'>Masculino</option>
                <option value='F'>Femenino</option>
              </select>
            </div>
            <div class='form-group'>
              <label>Fecha de nacimiento</label>
              <input type='text' class='form-control' v-model='newUser.fechaNacimiento'>
            </div>
            <div class='form-group'>
              <label>Identificación</label>
              <input type='text' class='form-control' v-model='newUser.identificacion'>
            </div>
            <div class='form-group' v-if='newUser.tipo == "profesional"'>
              <label>Tipo de profesional</label>
              <select class='form-control' v-model='newUser.tipoProfesional'>
                <option value='medico'>Médico</option>
                <option value='enfermero'>Enfermero</option>
                <option value='administrativo'>Administrativo</option>
              </select>
            </div>
            <div class='form-group'>
              <label>Dirección</label>
              <div class='card'>
                <div class='card-body'>
                  <div class='form-group'>
                    <label>Principal</label>
                    <input type='text' class='form-control' v-model='newUser.direccion.numero'>
                  </div>
                  <div class='form-group'>
                    <label>Número</label>
                    <input type='text' class='form-control' v-model='newUser.direccion.numero'>
                  </div>
                  <div class='form-group'>
                    <label>Barrio</label>
                    <input type='text' class='form-control' v-model='newUser.direccion.barrio'>
                  </div>
                  <div class='form-group'>
                    <label>Ciudad</label>
                    <input type='text' class='form-control' v-model='newUser.direccion.ciudad'>
                  </div>
                  <div class='form-group'>
                    <label>Departamento</label>
                    <input type='text' class='form-control' v-model='newUser.direccion.departamento'>
                  </div>
                </div>
              </div>
            </div>
            <div class='form-group text-center'>
              <button
                type='button'
                class='btn btn-primary'
                @click='saveUser()'
              >Guardar</button>
              <button type='button' class='btn btn-warning' ng-click='cancelSave()'>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { indexedDB } from '@/components/mixins/indexedDB'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'User',
  mixins: [indexedDB],
  data () {
    return {
      user: {},
      newUser: {
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        direccion: {
          principal: ''
        }
      },
      nombre: ''
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
  },
  validations: {
    newUser: {
      nombre: {
        required,
        minLength: minLength(5)
      },
      primerApellido: {
        required,
        minLength: minLength(5)
      }
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
