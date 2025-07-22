let numeroAzar = Math.floor(Math.random() * 100 + 1)
let numeroEntrada = document.getElementById("numeroEntrada")
let intentos = 0
let mejorPuntuacion = sessionStorage.getItem('mejorPuntuacion') || '---'
let bloquearToast = false
let juegoTerminado = false


document.getElementById('mejor').textContent = mejorPuntuacion

function chequearResultado() {
    if (juegoTerminado || bloquearToast) return

    let numeroIngresado = parseInt(numeroEntrada.value)

    if (isNaN(numeroIngresado) || numeroIngresado < 1 || numeroIngresado > 100) {
        Swal.fire({
            title: "El número ingresado no es valido",
            text: "Ingrese un número del  1 al 100",
            icon: "error",
            confirmButtonText: 'Entendido',
            confirmButtonColor: "#f093fb",
        })
        numeroEntrada.focus()
        return
    }

    intentos++
    document.getElementById('intentos').textContent = intentos

    if (numeroIngresado === numeroAzar) {
        juegoTerminado = true
        numeroEntrada.disabled = true
        document.getElementById('checkButton').disabled = true

        let esMejorPuntuacion = false
        if (mejorPuntuacion === '---' || intentos < parseInt(mejorPuntuacion)) {
            mejorPuntuacion = intentos
            localStorage.setItem('mejorPuntuacion', mejorPuntuacion)
            document.getElementById('mejor').textContent = mejorPuntuacion
            esMejorPuntuacion = true
        }
        Swal.fire({
            imageUrl: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2cwZmY0eDgwaWpnNHEzYXBqOWd4eGpmdmc2bTY0ZXdzazBidjVvbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oxHQrAmG6bd6RRh4s/giphy.gif",
            imageWidth: 100,
            imageHeight: 100,
            title: "Felicitaciones Ganaste!!",
            text: esMejorPuntuacion ?
                `¡Nuevo record lo lograste en ${intentos} intentos ` :
                `¡Ganaste en ${intentos} intentos!`,
            showConfirmButton: true,
            confirmButtonText: 'Jugar de nuevo',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                reiniciarJuego()
            }
        })

    } else if (numeroIngresado < numeroAzar) {
        bloquearToast = true
        Swal.fire({
            toast: true,
            icon: "info",
            title: "ES MÁS ALTO, tú puedes!!!",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            didClose: () => {
                bloquearToast = false
            }
        })
    } else {
        bloquearToast = true
        Swal.fire({
            toast: true,
            icon: "info",
            title: "MÁS BAJO, tú puedes!!!",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            didClose: () => {
                bloquearToast = false
            }
        })
    }
    numeroEntrada.value = ''
    numeroEntrada.focus()
}


function reiniciarJuego() {
    numeroAzar = Math.floor(Math.random() * 100 + 1)
    intentos = 0
    juegoTerminado = false

    document.getElementById('intentos').textContent = intentos
    numeroEntrada.value = ''
    numeroEntrada.disabled = false
    document.getElementById('checkButton').disabled = false
    numeroEntrada.focus()
    Swal.fire({
        title: "Nuevo juego",
        text: "Tengo un nuevo número. ¡¡Adivinalo!!",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end"
    })
}

numeroEntrada.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        chequearResultado()
    }
})

function playAudio() {
    let audio = document.getElementById("avengers")
    let audioBtn = document.getElementById('audioBtn')

    if (audio.paused) {
        audio.play()
        audioBtn.classList.add('playing')
    } else {
        audio.pause()
        audioBtn.classList.remove('playing')
    }

}
window.addEventListener('load', function () {
    numeroEntrada.focus()
})

function resetear() {
    Swal.fire({
        title: "Resetear tu Record",
        text: "¿Estas seguro de borrar tu mejor puntaje?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff5757",
        cancelButtonColor: "#667eea",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
        background: "#333",
        color: "#fff",

    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('mejorPuntuacion')
            mejorPuntuacion = '-'
            document.getElementById('mejor').textContent = mejorPuntuacion

            Swal.fire({
                title: "Reseteado con éxitos",
                text: "Tu mejor puntaje fue eliminado",
                icon: "success",
                timer: 2000,
                showCancelButton: true,
                showConfirmButton: false,
                background: "#333",
                color: "#fff",
            })
        }
    })
}