'use strict';

import { Registro } from "../js/RegistroC.js";


const BtnVolver= document.querySelector('#volver');
const BtnRegistrar = document.querySelector("#registrar");
const NombreCompleto = document.querySelector("#nombreCompleto");
const Email = document.querySelector("#email"); 
const Telefono = document.querySelector("#fono");
const Usuario = document.querySelector("#usuario");
const Pass = document.querySelector("#pass");



// Validar campos con sweetalert2.
const Validaciones = ()=>{

    if(NombreCompleto.value===""){
        swal("Ingrese su nombre", "El campo de nombre no puede ser vacio", "warning");
        return false;
    }else if(Email.value===""){
        swal("Ingrese su email", "El campo de email no puede ser vacio", "warning");
        return false;
    }else if(Telefono.value===""){
        swal("Ingrese su Telefono", "El campo de Telefono no puede ser vacio", "warning");
        return false;
    }else if(Usuario.value===""){
        swal("Ingrese su Telefono", "El campo de Telefono no puede ser vacio", "warning");
        return false;
    }else if(Pass.value===""){
        swal("Ingrese su Pass", "El campo de Pass no puede ser vacio", "warning");
        return false;
    }else{
        return true;
    }
    

}

const MensajeExitoso = ()=>{
    swal("Bienvenido", "Gracias... su registro se realizo correctamente", "success");
    return true;
}

// para limpiar campos luego de registrar

const LimpiarCampos = ()=>{

    NombreCompleto.value = '';
    Email.value = ''; 
    Telefono.value = ''; 
    Usuario.value = ''; 
    Pass.value = '';

}

// aplica para volver al menú principal
const volver = ()=>{return window.open('index.html','_self')};

const nuevoArrayUsuario = []; 

// Registro con objeto en localStorage
const registrarLocalStorage = () => {
   
    try{


        const nuevoRegistro = new Registro(NombreCompleto.value,Email.value,Telefono.value,Usuario.value,Pass.value);
       
        nuevoArrayUsuario.push(nuevoRegistro); 
        
        console.log(nuevoArrayUsuario);

        const JSONRegistro = JSON.stringify(nuevoArrayUsuario)
        console.log("Alumnos" + JSONRegistro);

        localStorage.setItem("Registro Usuario", JSONRegistro);

        // localStorage.setItem("nombreCompleto", usuarioFinal.nombreCompleto);
        // localStorage.setItem("email", usuarioFinal.email);
        // localStorage.setItem("telefono", usuarioFinal.telefono);
        // localStorage.setItem("usuario", usuarioFinal.usuario);
        // localStorage.setItem("pass", usuarioFinal.pass);

        return true;

    }catch{
        return false;
    }
 
}

//Evento click para registrar formulario. 
BtnRegistrar.addEventListener('click', ()=>{
 if(Validaciones()){
    
    if(registrarLocalStorage()){
        MensajeExitoso();
        LimpiarCampos();
    }

 } else{
    console.log('error inesperado en el registro');
 }
  
});


// Evento click para volver al menú login 

BtnVolver.addEventListener('click', ()=>{
    
    volver();

});