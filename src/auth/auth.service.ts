import { Injectable } from "@nestjs/common";

// service/provider is busy with business logic, while controller "controlls" requests

@Injectable({})
export class AuthService {

    signin() {
        return { msg: 'i have signed in' }
    }

    signup() {
        return { msg: 'i have signed up' }
    }
}
