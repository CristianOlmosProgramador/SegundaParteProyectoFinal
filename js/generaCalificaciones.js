
    // Acá no supe como llamar al constructor de la clase Alumnos para obtener el DNI y el nombre :(
    
   export class Asignatura{

        constructor(dni, nombreCOmpleto,asignatura,notaUno, notaDos, notaTres){
            this.dni = dni; 
            this.nombrecompleto = nombreCOmpleto;
            this.asignatura = asignatura;
            this.notaUno = notaUno;
            this.notaDos = notaDos; 
            this.notaTres = notaTres;
        }

        agregar(objpromedio){
            return arrPromedios.push(objpromedio);
        }
    
    }

    // Declaración de variables. 

    const dni = document.querySelector('#dni');
    const nombreCompletoAlumno = document.querySelector('#nombreAlumnoCompleto'); 
    const notaUno = document.querySelector('#Nota1');
    const notaDos = document.querySelector('#Nota2');
    const notaTres = document.querySelector('#Nota3');


     const  btnPromediar = document.getElementById('promediarCalificaciones');



    const btnCerrar = document.querySelector('#cerrar');
    const selectAsignaturas = document.querySelector("#asignaturas");



    if(btnPromediar){
        btnPromediar.addEventListener('click', ()=>{
      
      
            // Primero valida que los campos no esten vacios. 
            if(validacionesCamposVacios()){
                
                if(validarAlumnoNotas()){
                    registrar(); 
                    
                }else{
                    MensajeAlumnoExiste();
                }
                
                //funciona el registrar
              
    
                // if(validarCalificaciones()){
    
                //     //Promediar la suma de las notas entre 3
                //     let resultado = obtenerPromedio();  
                //     console.log(resultado);     
                   
                //     let observacion = obs(resultado);
                    
                //     if(existeAlumnoPromedio()){
                //         crearTablaHtml(dni.value,nombreCompletoAlumno.value,notaUno.value,notaDos.value,notaTres.value,resultado,observacion);
                //         LimpiarCampos();
                //     }
                    
                 
                                
                //     console.log(arrPromedios);
                // }
    
            }
    
        });
      }

  

    const verCombo = ()=>{
        console.log(selectAsignaturas[selectAsignaturas.selectedIndex].value)

    }

   export const arrPromedios = [];
    

    // Validaciones para campos vacios. 

     function validacionesCamposVacios(){

        if(dni.value===""){
            swal("Ingrese Dni alumno ", "El campo Dni no puede ser vacio", "warning");
            return false;
        }else if(nombreCompletoAlumno.value===""){
            swal("Ingrese El nombre del alumno", "El campo nombre de alumno no puede ser vacio", "warning");
            return false;
        }else if(notaUno.value===""){
            swal("Ingrese La primera nota", "El campo nota 1 no puede ser vacio", "warning");
            return false;
        }else if(notaDos.value===""){
            swal("Ingrese La segunda nota", "El campo nota 2 no puede ser vacio", "warning");
            return false;
        }else if(notaTres.value===""){
            swal("Ingresela tercera nota", "El campo nota 3 no puede ser vacio", "warning");
            return false;     
        } 
        else{
            return true;
        }

    }


    // Validación para las calificaciones. 

    function validarCalificaciones(){

        if(notaUno.value > 7 || notaDos.value > 7  || notaTres.value > 7){
            swal("Notas", "Las calificaciones ingresadas no pueden ser mayor a 7", "warning");
            return false;
        }else{
            return true;
        }
    }


    function obtenerPromedio(){
        let resultado =  (parseFloat(notaUno.value)+ parseFloat(notaDos.value)+ parseFloat(notaTres.value)) /3;  
        return resultado;
    }

    function crearTablaHtml(dni,nombrecompleto, asginatura, notaUno, notaDos, notaTres){
        const tabla = document.getElementById('addtabla');
        const fila  = document.createElement('tr');  

        fila.innerHTML=`<td> ${dni} </td><td> ${nombrecompleto} </td><td> ${asginatura} </td><td> ${notaUno} </td><td> ${notaDos} </td><td> ${notaTres} </td>`;
        fila.style.backgroundColor = "#64b5f6";
        
        tabla.appendChild(fila);
  
    }

    const obs = (result)=>{
          //Variable obserbacion
          let  obs =0;
          //Promedio menor o igual a 12.5 entonces aprobado, caso ocntrario aprobado
          if(result >=4){
              obs =value="!Aprobado¡ &#x2714";
              return obs;
          }else{
          obs =value="!Reprobado &#x274c";
          return obs;
          }   
    }

    
   

    const registrarAsignatura = (dni,nombre,asignatura, nota1, nota2,nota3)=>{
       
        const ingresarRegistro = new Asignatura(dni,nombre,asignatura,nota1, nota2,nota3);
        arrPromedios.push(ingresarRegistro); 
        
        console.log(ingresarRegistro);

        const JSONRegistro = JSON.stringify(arrPromedios)
        console.log("Alumnos" + JSONRegistro);

        localStorage.setItem("Registro notas asignatura", JSONRegistro);
    }
  
    

    const registrar = ()=>{

        let dniIng = dni.value;
        let nombreAlumnoIng = nombreCompletoAlumno.value; 
        let notaUnoIng = notaUno.value; 
        let notaDosIng = notaDos.value; 
        let notaTresIng = notaTres.value; 
        let asigIng = selectAsignaturas[selectAsignaturas.selectedIndex].innerText;

        console.log(asigIng);

        registrarAsignatura(dniIng, nombreAlumnoIng, asigIng, notaUnoIng, notaDosIng, notaTresIng );
        crearTablaHtml(dniIng, nombreAlumnoIng, asigIng, notaUnoIng, notaDosIng, notaTresIng);
        LimpiarCampos();
           
    
}
    
    const existeAlumnoPromedio = ()=>{

        let dniUtilizar = dni.value;
    
        const buscarAlumnoPromedio = arrPromedios.find((elemento,indice,array)=>{
            return elemento.dni == dniUtilizar
        })    
    
        console.log(buscarAlumnoPromedio);
    
        if(buscarAlumnoPromedio == undefined){
            registrar();
            MensajeExitoso();
          
            return true;
          
        }else{
            // si está el alumno lo ingreso al nuevo array de alumno buscado. 
            MensajeAlumnoExiste(); 
            console.log('ya se calcularon las notas para este dni. por favor vuelva a intentar con uno diferente');
            return false;
        }
    
    }

    const MensajeExitoso = ()=>{
        swal("Registro exitoso", "Gracias... se calcularon correctamente las calificaciones", "success");
        return true;
    }
    
    const MensajeAlumnoExiste = ()=>{
        swal("No es posible guardar cambios", "El alumno ingresado, ya tiene las calificacion para la asignatura seleccionada", "warning");
        return false;
    }

    const LimpiarCampos = ()=>{

        dni.value = '';
        nombreCompletoAlumno.value = ''; 
        notaUno.value = ''; 
        notaDos.value = ''; 
        notaTres.value = '';
    
    }


    // para cerrar sessión. 

    btnCerrar.addEventListener('click', ()=>{
    
        
    Swal.fire({
        title: '¿Está seguro que desea cerrar su sessión?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'SI',
        denyButtonText: 'NO',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
         // Swal.fire('Saved!', '', 'success')
         window.open('index.html');
        } else if (result.isDenied) {
        //   Swal.fire('Changes are not saved', '', 'info')
        }
      })


    });

    console.log(arrPromedios);


    // en la segunda entrega ya quiero lograr hacer que actualice la calificación y también que permita eliminar.

    const validarAlumnos = ()=>{

        

    }

    function existeAlumno(){

            const traerAlumnos = traerAlumnosLocalStorge(); 
            console.log(traerAlumnos);

            if(traerAlumnos == null){
                alert('no hay alumnos registrados')
            }else{
                
                const buscarAlumno = traerAlumnos.find((elemento,indice,array)=>{
                    return elemento.dni == dni.value
                })    

                if(buscarAlumno == undefined){
                    alert('no exisite alumno'); 
                }else{
    
                    const buscarAlumnoporRut = traerAlumnos.filter((elemento,indice,array)=>{
                        return elemento.dni == dni.value
                    })    

                    console.log(buscarAlumnoporRut);

                    if(buscarAlumnoporRut.length > 0){
                        
           
        
                        // return true;
                          
                         }else{
                             // validarCredencialesInvalidas();
                            //  return false;
                          }
                      
                }
        

    }

    
    function traerAlumnosLocalStorge(){

    const obtenerAlumnosLS = localStorage.getItem("Datos Alumnos");
    console.log("Ver array desde función existe alumno " + typeof JSON.parse(obtenerAlumnosLS));

    let jsonAlumnos1 = JSON.parse(obtenerAlumnosLS);
    console.log(jsonAlumnos1);

    return jsonAlumnos1;

    }

    const buscarNotasAlumnos = ()=>{
      
            const obtenerNotasAsignaturas = localStorage.getItem("Registro notas asignatura");
            console.log("Ver array desde función existe alumno " + typeof JSON.parse(obtenerAlumnosLS));
        
            let jsonAlumnos1 = JSON.parse(obtenerNotasAsignaturas);
            console.log(jsonAlumnos1);
        
            return jsonAlumnos1;

        
    }

    // dni.addEventListener('keyup', (e)=>{

    //     if (e.keyCode === 13) {
    //         console.log('hice enter');

    //         const traerAlumnos = traerAlumnosLocalStorge(); 
    //         console.log(traerAlumnos);

    //         if(traerAlumnos == null){
    //             alert('no hay alumnos registrados')
    //         }else{
                
    //             const buscarAlumno = traerAlumnos.find((elemento,indice,array)=>{
    //                 return elemento.dni == dni.value
    //             })    

    //             if(buscarAlumno == undefined){
    //                 alert('no exisite alumno'); 
    //             }else{
    
    //                 const buscarAlumnoporRut = traerAlumnos.filter((elemento,indice,array)=>{
    //                     return elemento.dni == dni.value
    //                 })    

    //                 console.log(buscarAlumnoporRut);

    //                 if(buscarAlumnoporRut.length > 0){
                        
           
    //                     for (const prop in buscarAlumnoporRut) {
    //                         // console.log(`obj.${prop} = ${buscarAlumnoporRut[0]["nombreCompleto"]}`);3
    //                         nombreCompletoAlumno.value = buscarAlumnoporRut[0]["nombreCompleto"];
    //                       }

                    

    //                         // return true;
                          
    //                      }else{
    //                          // validarCredencialesInvalidas();
    //                         //  return false;
    //                       }
                      

    //             }
        
            

                

    //         }



    //     }   

    // });


    const buscarAlumnoAsignatura = ()=>{
      
            let dniValidar = dni.value;

            const notasLocalStorage = buscarNotasLocalStorage();
            console.log(notasLocalStorage);

            // if(notasLocalStorage == null){
            //     // hacer alert
            //     alert("no existe el usuario"); 
            // }else{
               
            //     const buscarPass = usersLocalStorage.filter((elemento,indice,array)=>{
            //         return elemento.pass == passValidar && elemento.usuario == userValidar
                   
            //     });   
    
            //     console.log(buscarPass);
        
    
            //     if(buscarPass.length > 0){
                  
            //        return true;
                 
            //     }else{
            //         // validarCredencialesInvalidas();
            //         return false;
            //      }
            // }

    }

    
    const buscarNotasLocalStorage = ()=>{

        const obtenerNotas = localStorage.getItem("Registro notas asignatura");

        let JSONUsuarios = JSON.parse(obtenerNotas);
        console.log(JSONUsuarios);
                    
        return JSONUsuarios;
                    
    }
    }


    const obtenerDatosNotas = ()=>{ 

        const obtenerDatosNotas = localStorage.getItem("Registro notas asignatura");
       
        let jsonAlumnos1 = JSON.parse(obtenerDatosNotas);
        console.log(jsonAlumnos1);
    
        return jsonAlumnos1;


    }

    const validarAlumnoNotas = ()=>{ 

        const obtenerDatosNotas1 = obtenerDatosNotas(); 
       
        if(obtenerDatosNotas1 == null){
            registrar();
        }
        const buscarAlumnoNotas = obtenerDatosNotas1.find((elemento,indice,array)=>{
            return elemento.dni == dni.value && elemento.asignatura == selectAsignaturas[selectAsignaturas.selectedIndex].innerText;

        });

        
        console.log('abajo respuesta esperada');
        console.log(buscarAlumnoNotas);

        if(buscarAlumnoNotas == undefined){
            return true; 
        }else{ 
            return false;
        }
    }


    
    
        


        


   
