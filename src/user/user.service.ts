import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.usersRepository.save(userDto);
    return newUser;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }

  async update(id: number, userDto: UpdateUserDto): Promise<UserEntity> {
    return await this.usersRepository.save({ id, userDto });
  }
}
