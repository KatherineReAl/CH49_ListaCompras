const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const  productosTotal = document.getElementById("productosTotal");
const  contadorProductos= document.getElementById("contadorProductos");
const  precioTotal = document.getElementById("precioTotal");

let contador=0;
let costoTotal=0;
let TotalEnProductos=0;
let datos = new Array();

function validarCantidad(){
    if(txtNumber.value.length<=0){
        return false;
    }  //1. length<=0

    if (isNaN(txtNumber.value)) {
        return false;
    }//2. isNaN corrobora que sea Número
    if (Number(txtNumber.value) <= 0) {
        return false;
    }//3. Number valida que el valor sea >0
    
    return true;
}//validar cantidad

function getPrecio(){
   return Math.round((Math.random()*10000))/100; 
}//get precio
btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
   // console.log("Click ..."); // es solo para corroborar que funciona
   let isValid = true; //Bandera, al ser true permite agregar los datos a la tabla
   
   txtName.value = txtName.value.trim(); //me elimina los espacios para poder validar
   txtNumber.value = txtNumber.value.trim();


   txtName.style.border = "";
   alertValidacionesTexto.innerHTML="";
   alertValidaciones.style.display= "none";

   
   if (txtName.value.length<3){ //si regresa false

        //1. Mostrar la alerta de error
        //2. Borde de color rojo 
        txtName.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML +="<strong>El Nombre del producto no es correcto";
        alertValidaciones.style.display= "block";
        isValid=false;

    }//length

    //1. length
    //2. Número
    //3. >0

    if (! validarCantidad()){
        txtName.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML="<br/><strong>La cantidad no es correcta";
        alertValidaciones.style.display= "block";
        isValid=false;
    }//!validarCantidad

    
    if(isValid){
        contador++;
        let precio = getPrecio();
        let row = `<tr>
                    <td>${contador}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                   </tr>`;
        //Datos de la tabla

        let elemento = {"contador": contador,
                        "nombre": txtName.value,
                        "cantidad": txtNumber.value,
                        "precio": precio
                        };
        datos.push(elemento);

        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$" + costoTotal.toFixed(2);
        contadorProductos.innerText = contador;
        TotalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = TotalEnProductos;

        localStorage.setItem("costoTotal",costoTotal);
        localStorage.setItem("TotalEnProductos",TotalEnProductos);
        localStorage.setItem("contador",contador);

        txtName.value="";
        txtNumber.value="";
        txtName.focus();
                }//isValid Poder agregar los datos a la tabla
}); // btnAgregar click

btnClear.addEventListener("click", function(event){
    event.preventDefault();

    txtName.value = "";
    txtNumber.value = "";

    contador = 0;
    costoTotal=0;
    TotalEnProductos=0;
    precioTotal.innerText = "$" + costoTotal;
    contadorProductos.innerText = contador;
    productosTotal.innerText = TotalEnProductos;

    


    cuerpoTabla.innerHTML="";
    txtName.style.border = "";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display= "none";
}); //btnClear click

window.addEventListener("load", function(event) {
    // Recuperar los datos del localStorage
    if (localStorage.getItem("datos") != null) {
        datos = JSON.parse(localStorage.getItem("datos"));
    }

    if (localStorage.getItem("costoTotal") != null) {
        costoTotal = Number(localStorage.getItem("costoTotal"));
    }

    if (localStorage.getItem("contador") != null) {
        contador = Number(localStorage.getItem("contador"));
    }

    if (localStorage.getItem("TotalEnProductos") != null) {
        TotalEnProductos = Number(localStorage.getItem("TotalEnProductos"));
    }

    // Reconstruir la tabla con los datos guardados
    datos.forEach((r) => {
        let row = `<tr>
                       <td>${r.contador}</td>
                       <td>${r.nombre}</td>
                       <td>${r.cantidad}</td>
                       <td>${r.precio}</td>
                   </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    // Actualizar los totales en la interfaz
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    contadorProductos.innerText = contador;
    productosTotal.innerText = TotalEnProductos;
});
