export const indexedDB = {
  methods: {
    initDb: function () {
      var promise = new Promise((resolve, reject) => {
        if (this.db) {
          resolve(this.db)
        }

        var dbName = 'alfatec'
        var request = window.indexedDB.open(dbName, 1)

        request.onError = function (event) {
          reject(event.toString())
        }

        request.onsuccess = function (event) {
          this.db = event.target.result
          resolve(this.db)
        }

        request.onupgradeneeded = function (event) {
          var db = event.target.result
          var usuarioStore = db.createObjectStore('usuario', { keyPath: 'id' })
          usuarioStore.createIndex('tipo', 'tipo')
          usuarioStore.createIndex('tipoProfesional', 'tipoProfesional')
        }
      })

      return promise
    },
    getUsers: function () {
      var promise = new Promise((resolve, reject) => {
        this.initDb().then(function (db) {
          var transaction = db.transaction('usuario', 'readwrite')
          var objectStore = transaction.objectStore('usuario')
          objectStore.getAll().onsuccess = function (event) {
            resolve(event.target.result)
          }
        })
      })
      return promise
    },
    getUser: function (id) {
      var promise = new Promise((resolve, reject) => {
        this.initDb().then(function (db) {
          var transaction = db.transaction('usuario', 'readwrite')
          var objectStore = transaction.objectStore('usuario')

          objectStore.get(id).onsuccess = function (event) {
            resolve(event.target.result)
          }
        })
      })
      return promise
    }
  }
}
