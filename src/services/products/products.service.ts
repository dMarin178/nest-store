import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Array<Product> = [
    {
      id: 1,
      name: 'Product 1',
      description: '',
      price: 12000,
      stock: 30,
      image: 'https://example.com/images/product1.jpg',
    },
  ];

  private counterId = 1;

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }


  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    this.products.push({
      id: this.counterId,
      ...payload,
    });
    return this.counterId;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.products.find(product => product.id === id);
    if(!product){
      return new NotFoundException(`product ${id} not found`);
    }
    const index = this.products.findIndex(product => product.id);
    this.products[index] = {
      ...this.products[index],
      ...payload,
    }
    return this.products[index];
  }

  replace(id: number, payload: CreateProductDto) {
    const product = this.products.find(product => product.id === id);
    if(!product){
      return new NotFoundException(`product ${id} not found`);
    }
    const index = this.products.findIndex(product => product.id === id);
    this.products[index] = {
      id,
      ...payload
    }
    return this.products[index];
  }

  remove(id: number) {
    const product = this.products.find(product => product.id === id);
    if(!product){
      return new NotFoundException(`product ${id} not found`);
    }
    this.products = this.products.filter(product => product.id !== id);
    return id;
  }
}
