import { Body, Controller, Get, Post, Redirect, Render, Res, UseInterceptors } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { type Response } from 'express';
import { UserService } from '../user/user.service';
import { TimeInterceptor } from '../time.interceptor';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('registration')
  @Redirect('/auth/login')
  async registration(@Body() createUserDto: CreateUserDto) {
    await this.authService.registerUser({
      password: createUserDto.password,
      email: createUserDto.email,
    });
    await this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const user = await this.authService.loginUser(loginUserDto);
    const { expiresIn, sessionCookie } =
      await this.authService.createSessionToken(await user.getIdToken());
    const options = { maxAge: expiresIn, httpOnly: true, secure: true };
    res.cookie('session', sessionCookie, options);
    res.redirect('/books');
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    await this.authService.logout();
    res.clearCookie('session');
    res.redirect('/auth/login');
  }

  @Get('/login')
  @Render('login')
  @UseInterceptors(new TimeInterceptor())
  async loginPage() {}

  @Get('/registration')
  @Render('registration')
  @UseInterceptors(new TimeInterceptor())
  async registrationPage() {}
}
