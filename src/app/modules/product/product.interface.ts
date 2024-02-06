import mongoose, { Model } from 'mongoose';
import { IEvent } from '../event/event.interface';

type IRatings = {
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
};

type IReviews = {
  buyerName: string;
  stars: number;
  reviewTime: Date;
  message: string;
  images: string[];
};

// type IQuestionAndAnswer = {

// }

export type IProduct = {
  id: string;
  sellerId: mongoose.Types.ObjectId;
  title: string;
  brand: string;
  price: number;
  categories: string;
  images: string[];
  discountedPrice: number;
  discountPercent: number;
  ratings: IRatings;
  reviews: IReviews;
  productDetails: string;
  specification: string;
  //   questionsAndAnswer: // questions and answer should be a separate model to handle
  wishlist: string[];
  warranty: string; // it should be enum/constant
  event: IEvent;
  sku: string;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
