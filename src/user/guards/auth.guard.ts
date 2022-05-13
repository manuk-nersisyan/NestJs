import { CanActivate, ExecutionContext, HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ExpressRequestInterface } from "src/types/expressRequest.interface";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<ExpressRequestInterface>();

        if(request.user) {
            return true;
        }

        throw new HttpException('Not autorized', HttpStatus.UNAUTHORIZED)
    }
}