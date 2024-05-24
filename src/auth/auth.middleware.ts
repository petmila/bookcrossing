import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { firebaseAdmin } from '../auth/firebase.configure';
import { UserService } from '../user/user.service';

export interface CustomRequest extends Request {
  currentUserId: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const sessionCookie: string =
        (req.cookies.session as string) || '' || undefined;
      const currentUserEmail: string = (
        await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true)
      ).email;
      const user = (
        await this.userService.findManyFiltered({
          where: { email: currentUserEmail },
        })
      )[0];
      req.currentUserId = user.id;
    } catch (error) {
      res.redirect('/auth/login');
      return;
    }
    next();
  }
}
