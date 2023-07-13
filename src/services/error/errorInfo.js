export const generateUserErrorInfo = (user) =>{
    return `
    Alguno de los campos para crear el usuario no es valido:
    Lista de campos requeridos:
    first_name: Debe ser un campo string, pero se recibio ${user.first_name}
    last_name: Debe ser un campo string, pero se recibio ${user.last_name}
    email: Debe ser un campo string, pero se recibio ${user.email}
    age: Debe ser un campo number, pero se recibio ${user.age}
    `;
};

export const generateQuantityErrorInfo = (quantity) =>{
    return `quantity: Debe ser un campo number, pero se recibio ${quantity}`;
};

export const generateProductErrorInfo = (product) =>{
    return `
    Alguno de los campos para crear el producto no es valido:
    Lista de campos requeridos:
    title: Debe ser un campo string, pero se recibio ${product.title}
    description: Debe ser un campo string, pero se recibio ${product.description}
    price: Debe ser un campo number, pero se recibio ${product.price}
    category: Debe ser un campo string, pero se recibio ${product.category}
    thumbnail: Debe ser un campo string, pero se recibio ${product.category}
    code: Debe ser un campo string, pero se recibio ${product.category}
    stock: Debe ser un campo number, pero se recibio ${product.category}
    `;
};