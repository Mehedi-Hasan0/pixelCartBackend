import mongoose from 'mongoose';
import { IProduct } from './product.interface';
import { generateProductId, generateSku } from './product.utils';
import { Product } from './product.model';
import { Seller } from '../seller/seller.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createProduct = async (product: IProduct): Promise<IProduct | null> => {
  const session = await mongoose.startSession();
  let savedProduct = null;

  try {
    session.startTransaction();

    const id = await generateProductId(); // generating custom id
    const sku = generateSku(id); // generating product sku

    product.id = id; // appending product id
    product.sku = sku; // appending sku

    const newProduct = await Product.create([product], { session }); // saving product data

    const productId = newProduct[0]._id;

    savedProduct = newProduct[0]; // appending product to return to controller

    const sellerId = product.sellerId;

    const seller = await Seller.findById({ _id: sellerId }); // finding seller

    // if no seller found throwing error
    if (!seller) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Seller id is not valid!');
    }

    // in seller saving product id in seller documents for reference
    seller?.products?.push(productId);

    // saving the product id in DB
    await Seller.findOneAndUpdate({ _id: sellerId }, seller, {
      new: true,
      session,
    });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return savedProduct;
};

export const ProductService = {
  createProduct,
};
