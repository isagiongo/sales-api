import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface ProductRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    async execute({ name, price, quantity }: ProductRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);
        const productExists = await productRepository.findByName(name);

        if (productExists) {
            throw new AppError(`Product ${name} already exists`);
        }

        const product = productRepository.create({ name, price, quantity });
        await productRepository.save(product);

        return product;
    }
}

export default CreateProductService;
