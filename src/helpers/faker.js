import { Faker, en } from "@faker-js/faker";

export const customFaker = new Faker({ locale: [en] });

const { database, string, image, commerce} = customFaker;

export const generateProductFaker = () => {

    return {
        _id: database.mongodbObjectId(),
        title: commerce.productName(),
        description: commerce.productDescription(),
        price: parseFloat(commerce.price()),
        category: commerce.department(),
        thumbnail: image.url(),
        code: string.alphanumeric(10),
        stock: parseInt(string.numeric(2))
    };
};