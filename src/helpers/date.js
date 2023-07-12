export const date = async () =>{
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const dateInfo = `Fecha: ${date} - Hora: ${time}`;
    return dateInfo;
};