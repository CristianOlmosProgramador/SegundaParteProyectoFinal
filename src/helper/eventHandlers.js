import {main} from '../App.js'; 
import {validaciones} from '../helper/Validaciones.js'

export function handleClick(event){

    const id = event.target.id;  

    switch(id){
        case "login":
           
            console.log('hacer función que realiza el boton de login.');
            break; 
      
    
        default:
            console.log('aun nada');


    }



}