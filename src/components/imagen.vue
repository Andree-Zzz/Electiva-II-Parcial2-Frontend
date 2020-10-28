<template>
    <div class="card" >
        <img :src="`http://localhost:1337`+imagen.url.url" class="img-fluid card-img-top" alt="imagen">
        <div class="d-flex justify-content-between card-body py-2">
            <p class="card-text">{{ imagen.user.username }}</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Imagen",
    props: ["imagen"],//en propiedades, recibe un array
}
</script>