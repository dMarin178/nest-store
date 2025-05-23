import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/users/dtos/customer.dto';

@Injectable()
export class CustomerService {
  private customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '555-123-4567',
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      phone: '444-987-6543',
    },
  ];

  private counterId = 4;

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find(customer => customer.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  replace(id: number, payload: CreateCustomerDto) {
    const customer = this.findOne(id);
    const index = this.customers.findIndex(customer => customer.id === id);
    this.customers[index] = {
      id,
      ...payload,
    };
    return this.customers[index];
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    const index = this.customers.findIndex(customer => customer.id === id);
    this.customers[index] = {
      ...this.customers[index],
      ...payload,
    };
    return this.customers[index];
  }

  remove(id: number) {
    const index = this.customers.findIndex(customer => customer.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return id;
  }


}
