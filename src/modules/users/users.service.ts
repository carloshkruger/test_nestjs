import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashProvider } from 'src/modules/commom/hash-provider';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private hashProvider: HashProvider,
  ) {}

  async create({ name, email, password }: CreateUserDto) {
    const exists = await this.findByEmail(email);

    if (exists) {
      throw new ConflictException('E-mail already in use.');
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const model = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.usersRepository.save(model);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, { name, email, password }: UpdateUserDto) {
    this.usersRepository.update(
      { id },
      {
        name,
        email,
        password,
      },
    );
  }

  remove(id: string) {
    this.usersRepository.delete({
      id,
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }
}
