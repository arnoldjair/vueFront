<template>
  <div class="row">
    <div class="col-lg-6 offset-lg-3">
      <div class="text-center">
        <h1>Usuarios</h1>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="card text-lg-left">
            <div class="card-header">
              <div>
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click="showAddUser"
                >Nuevo usuario</button>
                <button type="button" class="btn btn-sm btn-danger">Borrar médicos</button>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Nombre completo</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.fullName }}</td>
                    <td>{{ user.tipo }}</td>
                    <td>
                      <button
                        class="btn btn-sm btn-outline-primary"
                        @click="showUser(user.id)"
                      >
                        <span>
                          <font-awesome-icon icon="search"></font-awesome-icon>
                        </span>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-primary"
                        ng-click="vm.editUser(user.id)"
                      >
                        <span>
                          <font-awesome-icon icon="edit"></font-awesome-icon>
                        </span>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-primary"
                        ng-click="vm.deleteUser(user.id)"
                      >
                        <span>
                          <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { indexedDB } from '@/components/mixins/indexedDB'
export default {
  name: 'Main',
  mixins: [indexedDB],
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.loadUsers()
  },
  methods: {
    showAddUser (event) {
      alert('como las yucas')
    },
    loadUsers () {
      this.getUsers().then(data => {
        this.users = []
        data.forEach(element => {
          element.fullName =
            element.nombre.nombre +
            ' ' +
            element.nombre.apellido1 +
            ' ' +
            element.nombre.apellido2

          this.users.push(element)
        })
      })
    },
    showUser (id) {
      var params = {
        id: id
      }

      this.$router.push({
        name: 'User',
        params: params
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
