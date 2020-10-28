<template>
  <!-- nav de categorias -->
  <nav class="d-flex flex-column align-items-start navbar navbar-expand-lg navbar-light bg-light">
    <div class="d-flex">
      <!-- <a :href="`/t/${tag.id}/edit`">Editar</a> -->
      <input v-model="search" type="text" style="width: 250px;" id="search" placeholder="Buscar por categoria" class=" px-3 py-1 rounded-pill">
      <!-- <button></button> -->
    </div>
    <div class="d-flex">
      <ul v-for="tag in this.tags" :key="tag.id" class="navbar-nav">
        <li class="nav-item mr-4">
          <a class="nav-link" href="#" @click="filtag(tag.nombre)">{{tag.nombre}}</a>
        </li>
      </ul>
    </div>
  </nav>
 <!-- end, nav de categorias -->
 <!-- paginacion -->
 <nav class="d-flex justify-content-end mr-4 mt-2" aria-label="...">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" @click="filtag()" href="#">Inicio</a>
    </li>
    <li class="page-item">
      <a class="page-link" @click="pagNext()" href="#">Siguientes imagenes</a>
    </li>
  </ul>
</nav>
 <!-- end, Paginacion -->
 <!-- imagenes -->
  <div class="row mx-2 my-2">
    <div class="col-3 p-2"  v-for="imagen in imagenes" :key="imagen.url.id">
        <Imagen :imagen="imagen" />
    </div>
  </div>
 <!--end, imagenes -->

</template>

<script>
  import Imagen from '@/components/imagen.vue'
  import axios from "axios";
  // import debounce from "debounce";

  export default {
    name: 'Home',
    components: { Imagen, },
    data() {
      return {
        search: '',
        tags: [],
        imagenes: [],
        pag: 10,
      }
    },
    mounted() {
      this.traerTags();
      this.filtag();
      
    },
    watch: {
      search(value) {
        // console.log(value);
        this.filtag(value)//retrasar 600 milisg
      }
    },
    methods: {
      traerTags() {
        axios.get("http://localhost:1337/tags", {
          params: {
            _sort: 'nombre:ASC',
          }
        }).then((response) => {
          this.tags = response.data
        });
      },
      filtag(nombre) {
        axios.get("http://localhost:1337/imagenes", {
          params: {
            'tags.nombre_contains': nombre,
            _start: 0,
            _limit: 10,
          }
        }).then((response) => {
          this.imagenes = response.data;
          this.imagenes.reverse()
        });
      },
      pagNext() {
        this.pag = this.pag + 10;
        axios.get("http://localhost:1337/imagenes", {
          params: {
            _start: 0,
            _limit: this.pag,
          }
        }).then((response) => {
          this.imagenes = response.data;
          this.imagenes.reverse()
        });
      }
    }
  };


</script>
