import {v4 as uuidv4} from 'uuid';

export const code = async () =>{
    const code = uuidv4();
    return code;
};
