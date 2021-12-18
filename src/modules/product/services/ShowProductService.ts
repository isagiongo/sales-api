import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface ProductRequest {
    id: string;
}

class ShowProductService {
    async execute({ id }: ProductRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);

        const product = await productRepository.findOne(id);

        if (!product) {
            throw new AppError(`Product ${id} not found`);
        }

        return product;
    }
}

export default ShowProductService;
