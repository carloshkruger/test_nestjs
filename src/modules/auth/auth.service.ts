import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashProvider } from 'src/modules/commom/hash-provider';
import { UsersService } from 'src/modules/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashProvider: HashProvider,
  ) {}

  async login({ email, password }: CreateAuthDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await this.hashProvider.compare(
      user.password,
      password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync(
      { userId: user.id, userRole: user.role },
      {
        secret: 'secret',
      },
    );

    return { accessToken };
  }
}
