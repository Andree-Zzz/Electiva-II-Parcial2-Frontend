<template>
    <div class="d-flex ml-3 mt-3">
        <h3>Mis Imagenes</h3>
        <button class="ml-3 btn-sm btn-dark" data-toggle="modal" data-target="#ModalAgregarIm">Agregar una imagen</button>
    </div>

    <div class="row mx-2 my-3">
        <div class="col-3 p-2"  v-for="imagen in imagenes" :key="imagen.url.id">
            <Imagen :imagen="imagen" />
        </div>
    </div>

      <!-- Modal agregar imagen -->
  <div class="modal fade" id="ModalAgregarIm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Agregar Imagen</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="agregarImagen">
            <div class="form-group">
              <label for="file">Selecciona la imagen</label>
              <input style="border: 0" type="file" class="form-control" id="file">
            </div>
            <div class="form-group w-50">
                <label for="tags">Categorias</label>
                  <select id="selected" v-model="selected" class="custom-select" >
                      <option v-for="tag in tags" :key="tag.id" :value="tag.nombre">
                        {{ tag.nombre }}
                      </option>
                  </select>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-dark">Subir</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- end, Modal agregar imagen -->
</template>

<script>
    import Imagen from '@/components/imagen.vue';
    import axios from "axios";

    export default {
        name: 'MisImagenes',
        components: { Imagen, },
        data() {
            return {
                token: localStorage.getItem('token'),
                imagenes: [],
                tags: [],
                selected: '',
            }
        },
        mounted() {
            this.traerTags();
            axios.get("http://localhost:1337/imagenes/me", {
                headers: {
                    Authorization: "Bearer " + this.token
                }
            }).then((response) => {
                this.imagenes = response.data;
            })
        },
        methods: {
            agregarImagen() {
                console.log(this.selected)
                var formdata = new FormData();
                var formfile = document.getElementById('file');
                var data = {};
                formdata.append('files.url', formfile.files[0]);
                formdata.append('data', data);
                axios.post("http://localhost:1337/imagenes",
                formdata, {
                    headers: {
                        'Authorization': "Bearer " + this.token,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) =>{
                  console.log(response.data)
                });
            },
            traerTags() {
                axios.get("http://localhost:1337/tags", {
                params: {
                    _sort: 'nombre:ASC',
                }
                }).then((response) => {
                this.tags = response.data
                });
            },
            eliminar(id) {
            console.log(id)
            axios.delete("http://localhost:1337/imagenes/" + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                }
            }).then((response) => {
                    console.log(response.data)
            });
        }
        }
    }
</script>