import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface ProductRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    async execute({
        id,
        name,
        price,
        quantity,
    }: ProductRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);

        const product = await productRepository.findOne(id);

        if (!product) {
            throw new AppError(`Product ${id} not found`);
        }

        const productExists = await productRepository.findByName(name);

        if (productExists && name !== product.name) {
            throw new AppError(
                `Product ${name} already exists with id ${productExists.id}`,
            );
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
