const socket = io();
let user;

const chatbox = document.getElementById('chatbox');
Swal.fire({
    title: "Ingrese su E-mail para poder ingresar al chat.",
    input: "text",
    inputValidator: (value) =>{
        return !value && "Necesita ingresar su E-mail para poder ingresar."
    },
    allowOutsideClick: false,
    toast: true 
}).then(result =>{
    user  = result.value;
let usuario = {
    user: user,
}
    socket.emit('authenticated', usuario);
})
chatbox.addEventListener('keyup', evt =>{
    console.log(evt);
    if(evt.key === "Enter"){
        if(chatbox.value.trim().length>0){
            socket.emit('message', {user:user, message:chatbox.value.trim()})
            chatbox.value = "";
        }
    }
})
socket.on('messageLogs', data =>{
    if(!user) return;
    let log = document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message => {
        messages +=  `${ message.user } dice: ${ message.message } <br/>  `       
    });
    log.innerHTML = messages
})
socket.on('newUserConnected', data =>{
    if(!user) return;
    Swal.fire({
        toast:true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data.user} se ha unido al chat`,
        icon: "success"
    })
})