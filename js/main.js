'use strict';
window.addEventListener("load", function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('sw.js')
            .then(res => console.log('SW Registrado'))
            .catch(err => console.error('SW No Registrado', err))
    }
})
if (window.Notification && window.Notification.permission !== 'denied') {
    setTimeout(() => {
        Notification.requestPermission().then(res => console.log('hola'))
    }, 1000)
}
let ConexionEstado = () => {

    if (navigator.onLine) {
        document.getElementById('aplicacion-estado').style.color = 'green'
        document.getElementById('aplicacion-estado').innerHTML = 'Estas Conectado'
    } else {

        document.getElementById('aplicacion-estado').style.color = 'red'
        document.getElementById('aplicacion-estado').innerHTML = 'Sin Conexion'
    }

}
window.addEventListener('online', ConexionEstado)
window.addEventListener('offline', ConexionEstado)

let eventoInstalar;
let instalardiv = document.getElementById('instalar')

let AplicacionInstalar = () => {

    if (eventoInstalar) {
        eventoInstalar.prompt();
        eventoInstalar.userChoice.then(res => {
            if (res.outCome == true) {
                instalardiv.style.display = 'none';
            } else {
                alert('gracias por pasar por nuestra pagina')
                instalardiv.style.display = 'none';
            }
        })
    }

}

let mostrarinstalacion = () => {
    if (instalardiv != 'undefined') {
        instalardiv.style.display = 'flex';
        instalardiv.addEventListener('click', AplicacionInstalar);
    }
}

window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    eventoInstalar = e;
    mostrarinstalacion();
})

let compartir = document.getElementById('Compartir')

if (compartir != undefined) {
    compartir.addEventListener('click', e => {
        let compartirInfo = {
            title: 'LasPelis',
            text: 'Aqui podras encontrar las mejores peliculas para su entretenimiento',
            url: 'http://localhost/parcial/index.html'
        }
        navigator.share(compartirInfo).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(res)
        })
    })
}