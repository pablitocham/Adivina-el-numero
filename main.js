let numeroAzar = Math.floor(Math.random()* 100 + 1) 
let numeroEntrada = document.getElementById("numeroEntrada")
let mensaje = document.getElementById("mensaje")

function chequearResultado() {
    let numeroIngresado = parseInt(numeroEntrada.value)

    if (numeroIngresado < 1 || numeroIngresado > 100 || isNaN(numeroIngresado)) {
        Swal.fire({
            title: "El número ingresado no es valido",
            icon: "error",
            text: "Ingrese un número del  1 al 100",
            color: "red",
        })
        return
    }

    if (numeroIngresado === numeroAzar) {
        Swal.fire({
            
            imageUrl:"https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2cwZmY0eDgwaWpnNHEzYXBqOWd4eGpmdmc2bTY0ZXdzazBidjVvbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oxHQrAmG6bd6RRh4s/giphy.gif",
            imageWidth: 100,
            imageHeight:100,
            title: "Felicitaciones Ganaste!!",
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 3000,
            timerProgressBar: true,
        })
        numeroEntrada.disabled = true
    } else if (numeroIngresado < numeroAzar) {
        Swal.fire({
            icon: "info",
            title: "Elige un número más alto!!!!",
            text: "Tu puedes, vamos!!!",
            confirmButtonText: "Seguir Intentando"
        })
    }else{
        Swal.fire({
            icon: "info",
            title: "Elige un número más bajo!!!!",
            text: "Tu puedes, vamos!!!",
            confirmButtonText: "Seguir Intentando"
        })
    }
}
numeroEntrada.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        chequearResultado()
    }
})

function playAudio(){
    let audio = document.getElementById("avengers")
    if(audio.paused){
        audio.play()
    }else{
        audio.pause()
    }
}

