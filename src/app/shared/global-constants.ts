export class GlobalConstants{
    public static genericError:string = "Something went Wrong";
    public static nameRegex:string ='[a-zA-Z0-9 ]*';
    public static emailregex:string = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
    public static contactRegex:string ='^[e0-9]{10,10}$';
    public static error:string = 'error';
    public static unauthorised:string = "you are not authorized to access this page"
    public static productExistError:string = "product already exists"
    public static productAdded:string = "product added successfully"
}