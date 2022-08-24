
const BtnCerrarSession = document.querySelector("#cerrar");


BtnCerrarSession.addEventListener('click',()=>{
 
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
         window.open('index.html', '_self');
        } else if (result.isDenied) {
        //   Swal.fire('Changes are not saved', '', 'info')
        }
      })
});


