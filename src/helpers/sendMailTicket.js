import { transporter } from "../config/gmail.js";

export const sendMailTicket = async (generateCode, generateDate, totalAmount, purchaserEmail) => {
    const email = await transporter.sendMail({
        from:"EL EMPORIO DEL JARDIN",
        to:`${purchaserEmail}`, //aca deberia ir el `${user.email}` para que le llegue el email al user, ahora lo harcodeo asi para constatar q funciona
        subject:"Tu compra",
        html: `<div>
        <h1>Muchas gracias por tu compra!</h1>
        <img src="https://paissano.com/wp-content/uploads/2018/07/Proyecto-de-Jardiner%C3%ADa.jpg" style="width:250px"/>
        <p>Tu compra fue realizada exitosamente.</p>
        <p>Datos importantes de tu compra:</p>
        <p>Codigo de compra: ${generateCode}</p>
        <p>Compra realizada el: ${generateDate}</p>
        <p>Total de compra: ${totalAmount}</p>
        <p>Para realizar el seguimiento de tu compra haz click <a href="https://www.google.com/">AQUI</a></p>
        <p>Si hay un problema con tu compra haz click <a href="https://www.google.com/">AQUI</a></p>
        <p>Si quieres recibir nuestros descuentos semanales haz click <a href="https://www.google.com/">AQUI</a></p>
        </div>`
    });
    return email;
}