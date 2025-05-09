import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto';

@Injectable()
export class UserService {
  private users = [
    {
      id: 1,
      email: 'john.doe@example.com',
      password: 'password123',
      name: 'John Doe',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      password: 'securepass456',
      name: 'Jane Smith',
    },
    {
      id: 3,
      email: 'alice.jones@example.com',
      password: 'mypassword789',
      name: 'Alice Jones',
    },
  ];

  private counterId = 3;

  findAll() {
    return this.users;
  }

  findOne(id: number) {
      const user = this.users.find(user => user.id === id);
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user;
    }

    create(payload: CreateUserDto) {
      this.counterId = this.counterId + 1;
      this.users.push({
        id: this.counterId,
        ...payload,
      });
      return this.counterId;
    }

    update(id: number, payload: UpdateUserDto) {
      const user = this.users.find(user => user.id === id);
      if (!user) {
        return new NotFoundException(`User ${id} not found`);
      }
      const index = this.users.findIndex(user => user.id === id);
      this.users[index] = {
        ...this.users[index],
        ...payload,
      };
      return this.users[index];
    }

    replace(id: number, payload: CreateUserDto) {
      const user = this.users.find(user => user.id === id);
      if (!user) {
        return new NotFoundException(`User ${id} not found`);
      }
      const index = this.users.findIndex(user => user.id === id);
      this.users[index] = {
        id,
        ...payload,
      };
      return this.users[index];
    }

    remove(id: number) {
      const user = this.users.find(user => user.id === id);
      if (!user) {
        return new NotFoundException(`User ${id} not found`);
      }
      this.users = this.users.filter(user => user.id !== id);
      return id;
    }
}
