import { Model, Types } from 'mongoose';
import { IEvent } from '../event/event.interface';
import { ISeller } from '../seller/seller.interface';

type IRatings = {
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
};

type IReviews = {
  buyerName: string;
  stars: string;
  reviewTime: string;
  message: string;
  images: string[];
};

// type IQuestionAndAnswer = {

// }

export type IProduct = {
  id: string; // create * append in backend
  sellerId: Types.ObjectId | ISeller;
  title: string;
  brand?: string;
  price: number;
  quantity: number;
  category: string;
  images?: string[];
  discountedPrice?: number;
  discountPercent?: number;
  ratings?: IRatings;
  reviews?: IReviews[];
  productDetails: string;
  specification?: string;
  //   questionsAndAnswer: // questions and answer should be a separate model to handle
  wishlist?: string[];
  warranty?: string; // it should be enum/constant
  event?: IEvent;
  sku?: string; // generate in the backend and append
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilterableFields = {
  searchTerm?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  categories?: string;
  ratings?: string;
};
