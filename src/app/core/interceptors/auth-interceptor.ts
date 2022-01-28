import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();

    const headers = {};
    if (authToken) {
      Object.assign(headers, {
        'X-Authorization': authToken,
        'X-web-version': environment.WEB_VERSION,
      });
    }

    const authRequest = req.clone(headers);
    return next.handle(authRequest);
  }
}
