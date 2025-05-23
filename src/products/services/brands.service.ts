import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dto';

@Injectable()
export class BrandsService {
  private brands = [
    { id:1, name: 'Nike'},
    { id:2, name: 'Adidas'},
    { id:3, name: 'Puma'}
  ]

  private counterId = 3;

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find(brand => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand #${id} not found`);
    return brand;
  }

  create(brand: CreateBrandDto){
    const id = this.counterId + 1;
    const newBrand = {
      ...brand,
      id
    }
    this.brands.push(newBrand);
    return newBrand;
  }

  replace(id: number, payload: CreateBrandDto) {
    const brand = this.findOne(id);
    const index = this.brands.findIndex(brand => brand.id === id);
    this.brands[index] = {
      id,
      ...payload
    }
    return this.brands[index];
  }

  update(id: number, payload: UpdateBrandDto){
    const brand = this.findOne(id);
    const index = this.brands.findIndex(brand => brand.id === id);
    this.brands[index] = {
      ...brand,
      ...payload
    }
    return this.brands[index];
  }

  remove(id: number) {
    const index = this.brands.findIndex(brand => brand.id === id);
    if(index === -1) throw new NotFoundException(`brand #${id} not found`);
    this.brands = this.brands.splice(index, 1);
    return id;
  }
}
