import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface ProductRequest {
    id: string;
}

class DeleteProductService {
    async execute({ id }: ProductRequest): Promise<void> {
        const productRepository = getCustomRepository(ProductRepository);

        const product = await productRepository.findOne(id);

        if (!product) {
            throw new AppError(`Product ${id} not found`);
        }

        await productRepository.remove(product);
    }
}

export default DeleteProductService;
