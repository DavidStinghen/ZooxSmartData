<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="name"
    class="elevation-1"
    height="450"
    flat
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Adicionar
            </v-btn>
          </template>
          <v-card>
            <v-snackbar
              v-model="snackbar"
              :timeout="2000"
              top
              right
              shaped
              color="warning"
            >
              {{ errorMessage }}
            </v-snackbar>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.abbreviation"
                      label="UF"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { format, parseISO } from 'date-fns'

export default {
  data: () => ({
    name: "StateGrid",
    dialog: false,
    headers: [
      { text: "Nome", value: "name" },
      { text: "UF", value: "abbreviation"},
      { text: "Criado em", value: "createdAt"},
      { text: "Atualilzado em", value: "updatedAt"},
      { text: "Ações", value: "actions", sortable: false }
    ],
    items: [],
    editedIndex: -1,
    errorMessage: '',
    snackbar: false,
    editedItem: {
      name: "",
      abbreviation: "",
      createdAt: "",
      updatedAt: ""
    },
    defaultItem: {
      name: "",
      abbreviation: "",
      createdAt: "",
      updatedAt: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Adicionar Estado" : "Editar Estado";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.axios.get("http://localhost:3333/states")
        .then(res => (
          this.items = res.data.map(state => {
            const { createdAt, updatedAt } = state
            state.createdAt = format(parseISO(createdAt), 'dd/MM/yyyy H:m:s')
            state.updatedAt = format(parseISO(updatedAt), 'dd/MM/yyyy H:m:s')
            
            return state;
          })
        ))
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      let id = Object.assign({}, item)._id
      this.axios.delete(`http://localhost:3333/states/${id}`)
        .then(() => {
          this.items.splice(this.items.indexOf(item), 1)
          this.initialize()
        })
        .catch((err) => {
          this.errorMessage = err.response.data.message
          this.snackbar = true
        })
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.axios.put(`http://localhost:3333/states/${this.editedItem._id}`, {
            "name": this.editedItem.name,
            "abbreviation": this.editedItem.abbreviation
        })
        .then(() => {
          Object.assign(this.items[this.editedIndex], this.editedItem)
          this.initialize()
          this.close()
        })
        .catch(err => {
          this.errorMessage = err.response.data.message
          this.snackbar = true
        })
      } 
      else {
        this.axios.post("http://localhost:3333/states", { 
            "name": this.editedItem.name,
            "abbreviation": this.editedItem.abbreviation
        })
        .then(res => {
            this.items.push(res.data)
            this.initialize()
            this.close();
        })
        .catch(err => {
          this.errorMessage = err.response.data.message
          this.snackbar = true
        })
      }
    }
  }
};
</script>
