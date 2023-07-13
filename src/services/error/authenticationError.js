export const generateAuthenticationErrorParam = (email) => {
    return `
    El email recibido: " ${email} " no se encuentra en nuestra base de datos o es invalido.
    `;
};