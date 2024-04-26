import mongoose, { SortOrder } from 'mongoose';
import { IProduct, IProductFilterableFields } from './product.interface';
import { generateProductId, generateSku } from './product.utils';
import { Product } from './product.model';
import { Seller } from '../seller/seller.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../user/user.interface';
import { IGenericResponse } from '../../../types';
import { productSearchFields } from './product.constant';
import { paginationHelper } from '../../../helpers/paginationHelpers';

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

const getAllProducts = async (
  filters: IProductFilterableFields,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andCondition = [];

  // handling searchTerm
  if (searchTerm) {
    andCondition.push({
      $or: productSearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // handling other filters data
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // for minPrice
  if (minPrice) {
    andCondition.push({
      price: {
        $gte: minPrice,
      },
    });
  }

  // for minPrice
  if (maxPrice) {
    andCondition.push({
      price: {
        $lte: maxPrice,
      },
    });
  }

  // handle sorting
  const sortingCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortingCondition[sortBy] = sortOrder;
  }

  const whenCondtion = andCondition.length > 0 ? { $and: andCondition } : {};

  const allProductsData = await Product.find(whenCondtion)
    .sort(sortingCondition)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(whenCondtion);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: allProductsData,
  };
};

const getSingleProducts = async (id: string): Promise<IProduct> => {
  const singleProduct = await Product.findById({ _id: id });

  if (!singleProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  return singleProduct;
};

const updateSingleProduct = async (
  id: string,
  productData: Partial<IProduct>,
): Promise<IProduct | null> => {
  // TODO: embedded field review should not be able to edit in the frontend
  const singleProduct = await Product.findById({ _id: id });

  if (!singleProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  const newUpdatedProduct = await Product.findOneAndUpdate(
    { _id: id },
    productData,
    { new: true },
  );

  return newUpdatedProduct;
};

const deleteProduct = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isProductExist = await Product.findById({ _id: id });

    if (!isProductExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }

    const productOwner = await Seller.findOne({
      _id: isProductExist?.sellerId,
    });

    if (!productOwner) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Operation cancelled due to product owner not found!',
      );
    }

    // MongoDB id can't be compared directly with '==' or '==='. That's why we need to convert it to a string then compare it instance
    // new ObjectId('662ba8290ffb7057c7177a16').toHexString() => 662ba8290ffb7057c7177a16

    productOwner.products = productOwner.products?.filter(
      product => product.toHexString() !== isProductExist._id.toHexString(),
    );

    await productOwner.save();

    const deletedProduct = await Product.findOneAndDelete({ _id: id });

    await session.commitTransaction();
    await session.endSession();

    return deletedProduct;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const ProductService = {
  createProduct,
  getSingleProducts,
  getAllProducts,
  updateSingleProduct,
  deleteProduct,
};
