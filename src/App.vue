<template>
  <div class="d-flex container-fluid bg-light  py-3">
    <div class="d-flex">
      <a href="/">
        <img src="./assets/U.png" alt="Logo" class="logo img-fluid ml-1 mr-2" draggable="false">
      </a>
    </div>
    <div class="d-flex">
      <button v-if="silogin" type="button" class="btn btn-light mx-1" data-toggle="modal" data-target="#ModalLogin">Login</button>
      <button v-if="siregistro" type="button" class="btn btn-success mx-1" data-toggle="modal" data-target="#ModalRegistro">Join free</button>
      <button v-if="simis" @click="this.$router.push('/misimagenes')" type="button" class="btn btn-light mx-1">Mis imagenes</button>
      <a href="/">
        <button v-if="sisalir"  @click="salir" type="button" class="btn btn-light mx-1">Salir</button>
      </a>
    </div>
  </div>

  <!-- Modal Login -->
  <div class="modal fade" id="ModalLogin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Iniciar sesion</h5>
          <button @click="borrarDatos" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="lemail">Correo electronico</label>
              <input type="email" v-model="lemail" class="form-control" id="lemail" required>
            </div>
            <div class="form-group">
              <label for="lpassword">Contraseña</label>
              <input type="password" v-model="lpassword" class="form-control" id="lpassword" required>
            </div>
            <div v-if="lcorrecto">
              <span style="color: green">
                Login exitoso
              </span>
            </div>
            <div v-if="error">
              <span style="color: red">
                Las credenciales no son correctas
              </span>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-dark">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- end, Modal Login -->

  <!-- Modal Registro -->
  <div class="modal fade" id="ModalRegistro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Join free</h5>
          <button @click="borrarDatos" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="registro">
            <div class="form-group">
              <label for="username">Nombre de usuario</label>
              <input type="text" v-model="username" class="form-control" id="username" required>
            </div>
            <div class="form-group">
              <label for="email">Correo electronico</label>
              <input type="email" v-model="email" class="form-control" id="email" required>
            </div>
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input type="password" v-model="password" class="form-control" id="password" required>
            </div>
            <div v-if="correcto">
              <span style="color: green">
                Registro exitoso
              </span>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-dark">Registrarme</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- end, Modal Registro -->
  <router-view/>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      silogin: true,
      siregistro: true,
      simis: false,
      sisalir: false,
      user: [],
      username: '',
      email: '',
      password: '',
      lemail: '',
      lpassword: '',
      error: false,
      lcorrecto: false,
      correcto: false,
    }

  },
  mounted() {
    if(localStorage.getItem('silogin')){
      this.silogin = false;
    }
    if(localStorage.getItem('siregistro')){
      this.siregistro = false;
    }
    if(localStorage.getItem('simis')){
      this.simis = true;
    }
    if(localStorage.getItem('sisalir')){
      this.sisalir = true;
    }
  },
  methods: {
    login() {
      axios.post("http://localhost:1337/auth/local", {
        identifier: this.lemail,
        password: this.lpassword
      }).then((response) => {
        // console.log(response.data);
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('silogin', false);
        localStorage.setItem('siregistro', false);
        localStorage.setItem('simis', true);
        localStorage.setItem('sisalir', true);
        this.error = false;
        this.lcorrecto = true;
        this.simis = true;
        this.silogin = false;
        this.siregistro = false;
        this.sisalir = true;
      }).catch((error) =>{
        this.error = true;
      })
    },
    registro() {
      axios.post("http://localhost:1337/auth/local/register", {
        username: this.username,
        email: this.email,
        password: this.password,
      }).then((response) =>{
        if(!localStorage.getItem('siregistro')){
          localStorage.setItem('siregistro', false);
        };
        this.correcto = true;
        // console.log(response.data)
      })
    },
    borrarDatos() {
      if(this.username){
        this.username = '';
      };
      if(this.email){
        this.email = '';
      };
      if(this.password){
        this.password = '';
      };
      if(this.lemail){
        this.lemail = '';
      };
      if(this.lpassword){
        this.lpassword = '';
      };
      if(this.error){
        this.error = false
      };      
    },
    salir() {
      localStorage.removeItem('silogin');
      localStorage.removeItem('siregistro');
      localStorage.removeItem('simis');
      localStorage.removeItem('sisalir');
      localStorage.removeItem('token');
    }
  }
}
</script>
<style>
.logo {
  width: 40px; height: 40px;
}
input {
  outline: none;
}
</style>
