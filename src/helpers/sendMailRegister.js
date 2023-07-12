import { transporter } from "../config/gmail.js";

const emailTemplate = `<div>
<h1>Bienvenid@!!</h1>
<img src="https://paissano.com/wp-content/uploads/2018/07/Proyecto-de-Jardiner%C3%ADa.jpg" style="width:250px"/>
<p>Tu registro fue realizado exitosamente.</p>
<p>Si quieres recibir nuestros descuentos semanales, clickea <a href="https://www.google.com/">AQUI</a></p>

</div>`;

export const sendMailRegister = async (user) => {
    const email = await transporter.sendMail({
        from:"EL EMPORIO DEL JARDIN",
        to:`${user.email}`, //aca deberia ir el `${user.email}` para que le llegue el email al user, ahora lo harcodeo asi para constatar q funciona
        subject:"Registro exitoso",
        html: emailTemplate
    });
    return email;
}