'use strict'; 



    const btnLogin = document.querySelector('#login');
    const usuario = document.querySelector('#correo');
    const pass = document.querySelector('#pass');
    const modal = document.querySelector("#modal");
    
    
        const validarInput = ()=>{

            if( usuario.value == '' && pass.value == ''){
                validarCredencialesModal(); 
                return false;
            }
            else{
                return true;
            }
        }

        const buscarUsuarioLocalStorage = ()=>{

            const ObtenerUsuario = localStorage.getItem("Registro Usuario");

            let JSONUsuarios = JSON.parse(ObtenerUsuario);
            console.log(JSONUsuarios);
                        
            return JSONUsuarios;
                        
        }


        const existeUsuarioLocalStorage = ()=>{

            let userValidar = usuario.value;
            let passValidar = pass.value;
                
            const usersLocalStorage = buscarUsuarioLocalStorage();
         
            if(usersLocalStorage == null){
                validaUsuarioExiste();
                // alert("no existe el usuario"); 
            }else{
                
                const buscarPass = usersLocalStorage.find((elemento,indice,array)=>{
                return elemento.pass == passValidar && elemento.usuario == userValidar
                   
                });   
    
                console.log(buscarPass);
        
    
                if(buscarPass == undefined){
                  
                    validarCredencialesInvalidas();
                 
                }else{
                    // validarCredencialesInvalidas();
                    return true;
                 }
            }


           

        }

            function validaUsuarioExiste(){
            swal("Usuario no registrado", "Por favor, registre su usuario", "warning");
            return false;
        }

    
            function validarCredencialesModal(){
                swal("Ingrese sus credenciales", "La credenciales no pueden estar vacias", "warning");
                return false;
            }
        
            function validarCredencialesInvalidas(){
                swal("Credenciales Invalidas", "Por favor! Ingrese sus credenciales nuevamente", "error");
                return false;
            }
        
    
            btnLogin.addEventListener('click', ()=>{
                // probando ternario

                if(validarInput()){
                    if(existeUsuarioLocalStorage()){
                        window.open('menuPrincipal.html','_self')
                    }
                }

                // validarInput() && existeUsuarioLocalStorage() ?  window.open('menuPrincipal.html','_self') : console.log('si es false salir del sistema');

            });
            
            const MensajeExitoso = ()=>{
                swal("Bienvenido", "Gracias... su registro se realizo correctamente", "success");
                return true;
            }
            