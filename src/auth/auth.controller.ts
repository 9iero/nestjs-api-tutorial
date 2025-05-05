import { Body, Controller, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

// allows for controller to be clean, and only busy with logic for the requests, while service is busy w business logic

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin() {
        return this.authService.signin();
    }

}