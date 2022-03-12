import { User } from '../../interfaces/user/User';
import { loginService } from '../LoginService';
import { ApiResponse } from '../../interfaces/response/ApiResponse';

export class AuthService {

    public static async login(obj: User): Promise<ApiResponse> {
        return (await loginService.post('/login', obj)).data;
    }
}