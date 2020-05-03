
export class UserRoles {
    public userroletypeid: number;
    public rolename: string;
    public roledescription:string;

    
    constructor(userroletypeid:number,rolename: string,roledescription:string) {
    this.userroletypeid = userroletypeid;
    this.rolename = rolename;
    this.roledescription = roledescription;
     }
    }