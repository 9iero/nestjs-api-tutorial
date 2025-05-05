import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// service/provider is busy with business logic, while controller "controlls" requests

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) {}
    
    async signup(dto: AuthDto) {
        //generate the password hash
        const hash = await argon.hash(dto.password)

        try{

        //save the new user in the db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        // return the saved user
        return user;  

        } catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Credentials Taken')
                }
            }
            throw error;
        }

    }
    
    signin() {

        // find user by email
        // if user does not exist throw exception

        // compare password
        // if password incorrect throw exception

        // send back the user
        return { msg: 'i have signed in' }
    }
}
