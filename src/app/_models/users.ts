
export class Users {
    public id: number;
    public username: string;
    public password: string;
    public email: string;
    public role: string;
    public jobtitle: string;
    public organisation: string;

    constructor(id: number, username: string, password: string, email: string, role: string, jobtitle: string, resource: string, organisation: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.jobtitle = jobtitle;
        this.organisation = organisation;
    }
}