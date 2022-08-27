    // Importaciones

    import {Asignatura} from './generaCalificaciones.js'
    import { arrPromedios } from './generaCalificaciones.js';

    // Declaración de variables. 
    const arrNotas = [];
    const dni = document.querySelector('#dni');
    const nombreCompletoAlumno = document.querySelector('#nombreAlumnoCompleto'); 
    const notaUno = document.querySelector('#Nota1');
    const notaDos = document.querySelector('#Nota2');
    const notaTres = document.querySelector('#Nota3');
    const btnActualizaNotas = document.querySelector('#actualizaNotas');
    const btnCerrar = document.querySelector('#cerrar');
    const selectAsignaturas = document.querySelector("#asignaturas");


    if(btnActualizaNotas){
        btnActualizaNotas.addEventListener('click', ()=>{

            console.log('hice click')
    
            if(validacionesCamposVacios()){
                if(validarCalificaciones()){
                    localStorage.removeItem('Registro notas asignatura');
                    console.log('eliminar data y despues registrar');
                    registrarNota();
                    limpiarCampos();
                  
    
                }
            }
             
        });
    }


    // Validaciones para campos vacios. 

    function validacionesCamposVacios(){

        if(dni.value===""){
            swal("Ingrese Dni alumno ", "El campo Dni no puede ser vacio", "warning");
            return false;
        }else if(nombreCompletoAlumno.value===""){
            swal("Ingrese El nombre del alumno", "El campo nombre de alumno no puede ser vacio", "warning");
            return false;
        } 
        else{
            return true;
        }

    }

    function validarCalificaciones(){

        if(notaUno.value > 7 || notaDos.value > 7  || notaTres.value > 7){
            swal("Notas", "Las calificaciones ingresadas no pueden ser mayor a 7", "warning");
            return false;
        }else{
            return true;
        }
    }


    export const desactivarNotas = ()=>{
        nombreCompletoAlumno.disabled = true; 
        notaUno.disabled = true; 
        notaDos.disabled = true; 
        notaTres.disabled = true; 
        //btnActualizaNotas.disabled = true;
        selectAsignaturas.disabled = true;
    }

    const activarNotas = ()=>{ 
        notaUno.disabled = false; 
        notaDos.disabled = false; 
        notaTres.disabled = false; 
    }

    if(selectAsignaturas){
        selectAsignaturas.addEventListener('change', ()=>{
            notaUno.value = '';
            notaDos.value = '';
            notaTres.value = '';
            //desactivarNotas();
        });
    
    }


     desactivarNotas();

      export function traerAlumnosLocalStorge(){

        const obtenerAlumnosLS = localStorage.getItem("Registro notas asignatura");
        console.log("Ver array desde función existe alumno " + typeof JSON.parse(obtenerAlumnosLS));
    
        let jsonAlumnos1 = JSON.parse(obtenerAlumnosLS);
        console.log(jsonAlumnos1);
    
        return jsonAlumnos1;
    
        }

       export const limpiarCampos = ()=>{ 
            dni.value = '';
            nombreCompletoAlumno.value = ''; 
            notaUno.value = ''; 
            notaDos.value = ''; 
            notaTres.value = ''; 

        }


        export const asignaturaNoCoincide = ()=>{

            swal("No se encuentran registros", "El alumno ingresado no tiene registros de calificaciones para la asignatura seleccionada", "warning");
            return false;
        }

        export const alumnoNoEncontrado = ()=>{

            swal("No se encuentran registros", "no hay registro de calificaciones", "warning");
            return false;
        }

        export const existeAlumno = ()=>{

            swal("No se encuentran registros", "No existe el alumno seleccionado en los regisros de calificaciones", "warning");
            return false;
        }


        dni.addEventListener('keyup', (e)=>{

                if (e.keyCode === 13) {

                    console.log('hice enter');

                    const traerAlumnos = traerAlumnosLocalStorge(); 
                    console.log(traerAlumnos);

                    if(traerAlumnos == null){
            
                        consultaRegistro();
                    
                    }else{
                        
                        const buscarAlumno = traerAlumnos.find((elemento,indice,array)=>{
                            return elemento.dni == dni.value
                        })    

                        if(buscarAlumno == undefined){
                            consultaRegistro();
                            limpiarCampos();
                        

                        }else{
            
                            const buscarAlumnoporRut = traerAlumnos.filter((elemento,indice,array)=>{
                                return elemento.dni == dni.value && elemento.asignatura == selectAsignaturas[selectAsignaturas.selectedIndex].innerText;
                            })    

                            if(buscarAlumnoporRut.length > 0){
                                
                                for (const prop of buscarAlumnoporRut) {
                                    // para obtener los datos en las cajas de texto.
                                    nombreCompletoAlumno.value = buscarAlumnoporRut[0]["nombrecompleto"];
                                    notaUno.value = buscarAlumnoporRut[0]["notaUno"];
                                    notaDos.value = buscarAlumnoporRut[0]["notaDos"];
                                    notaTres.value = buscarAlumnoporRut[0]["notaTres"];
                                }

                                if (notaUno.value == '' && notaDos.value =='' && notaTres.value == ''){
                                            console.log('campos de notas vacios'); 
                                }else{
                                    console.log('dejar editar'); 
                                    // activarNotas();
                                    notaUno.disabled = false;
                                    notaDos.disabled = false; 
                                    notaTres.disabled = false;
                                }
                                
                                }else{
                                    asignaturaNoCoincide();
                                    desactivarNotas();
                                
                                }
                            
                        }
                    }

                }   

            });

          
        const registrarAsignatura = (dni,nombre,asignatura, nota1, nota2,nota3)=>{
            
         localStorage.removeItem('Registro notas asignatura');

            const ingresarRegistro = new Asignatura(dni,nombre,asignatura,nota1, nota2,nota3);
            arrNotas.push(ingresarRegistro); 
            
            console.log(ingresarRegistro);

            const JSONRegistro = JSON.stringify(arrNotas)
            console.log("Alumnos" + JSONRegistro);

            localStorage.setItem("Registro notas asignatura", JSONRegistro);
        }

            const registrarNota = ()=>{

                let dniIng = dni.value;
                let nombreAlumnoIng = nombreCompletoAlumno.value; 
                let notaUnoIng = notaUno.value; 
                let notaDosIng = notaDos.value; 
                let notaTresIng = notaTres.value; 
                let asigIng = selectAsignaturas[selectAsignaturas.selectedIndex].innerText;

                console.log(asigIng);

                registrarAsignatura(dniIng, nombreAlumnoIng, asigIng, notaUnoIng, notaDosIng, notaTresIng );
            
            
        }


        const consultaRegistro = ()=>{ 
            Swal.fire({
                title: 'No se encuentran registros para el DNI ingresado',
                text: "¿Que desea realizar?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ingresar Calificaciones',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Intentar con otro DNI',
            }).then((result) => {
                if (result.isConfirmed) {
                Swal.fire(
                    window.open('ingresoCalificaciones.html','_self')
                )
                }else{
                   desactivarNotas();
                }
               
            })
        }