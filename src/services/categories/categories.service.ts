import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';

@Injectable()
export class CategoriesService {
  private categories = [
    {id: 1, name: 'Electronics'},
    {id: 2, name: 'Clothing'},
    {id:3, name: 'Electrodomestics'}
  ]

  private counterId = 3;

  findAll() {
    return this.categories;
  }

  findOne(id: number){
    const category = this.categories.find(category => category.id === id);
    if(!category) throw new NotFoundException(`Category #${id} not found`);
    return category;
  }

  create(payload: CreateCategoryDto){
    const newCategory = {
      id: this.counterId + 1,
      ...payload
    }
    this.categories.push(newCategory)
    return newCategory;
  }

  replace(id: number, payload: CreateCategoryDto){
    const category = this.findOne(id);
    if(!category) throw new NotFoundException(`Category #${id} not found`);
    const index = this.categories.findIndex(category => category.id === id);
    this.categories[index] = {
      id,
      ...payload
    }
    return this.categories[index];
  }

  update(id: number, payload: UpdateCategoryDto){
    const category = this.findOne(id);
    if(!category) throw new NotFoundException(`Category #${id} not found`);
    const index = this.categories.findIndex(category => category.id === id);
    this.categories[index] = {
      ...category,
      ...payload
    }
  }

  remove(id: number) {
    const index = this.categories.findIndex(category => category.id === id);
    if(index === -1) throw new NotFoundException(`category #${id} not found`);
    this.categories = this.categories.splice(index, 1);
    return id;
  }

}
