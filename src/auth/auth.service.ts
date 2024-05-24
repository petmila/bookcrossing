import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { firebaseAdmin, firebaseAuth } from './firebase.configure';
import * as auth from 'firebase/auth';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerUser(registerUserDto: LoginUserDto) {
    await auth.createUserWithEmailAndPassword(
      firebaseAuth,
      registerUserDto.email,
      registerUserDto.password,
    );
    return auth.getAuth().currentUser;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    await auth.signInWithEmailAndPassword(
      firebaseAuth,
      loginUserDto.email,
      loginUserDto.password,
    );
    return auth.getAuth().currentUser;
  }

  async logout() {
    await auth.signOut(firebaseAuth);
  }

  async createSessionToken(uid: string) {
    const expiresIn = 60 * 60 * 24 * 2 * 1000; //2 day
    const sessionCookie = await firebaseAdmin
      .auth()
      .createSessionCookie(uid, { expiresIn });
    return { expiresIn, sessionCookie };
  }
}
