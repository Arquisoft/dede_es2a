import { environment } from "../environments/environment";
import axios from 'axios';

export class loginService {
    static baseUrl = environment.baseUrl;

    public static post(path:string, obj:any):Promise<any> {
        return axios.post(this.baseUrl + path, obj);
    }
}