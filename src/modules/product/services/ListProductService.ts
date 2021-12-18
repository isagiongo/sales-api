import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

class ListProductService {
    async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepository);

        return await productRepository.find();
    }
}

export default ListProductService;
