export class CreateContactDto{
    constructor(user){
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.age = user.age;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    };
};
export class GetContactDto{
    constructor(userDb){
        this.full_name = userDb.first_name + " " + userDb.last_name;
        this.email = userDb.email;
    };
};