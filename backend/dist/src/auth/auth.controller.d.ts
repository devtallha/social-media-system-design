import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';
import { RegisterUserDto } from '../users/dto/register-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(registerUserDto: RegisterUserDto): Promise<{
        email: string;
        username: string;
        id: string;
        createdAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            email: any;
        };
    }>;
}
