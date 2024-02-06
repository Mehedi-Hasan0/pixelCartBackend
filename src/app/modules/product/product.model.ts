import { Schema, model } from 'mongoose';
import { IProduct, ProductModel } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    discountedPrice: {
      type: Number,
    },
    discountPercent: {
      type: Number,
    },
    ratings: {
      oneStar: {
        type: Number,
      },
      twoStars: {
        type: Number,
      },
      threeStars: {
        type: Number,
      },
      fourStars: {
        type: Number,
      },
      fiveStars: {
        type: Number,
      },
    },
    reviews: {
      buyerName: {
        type: String,
      },
      stars: {
        type: Number,
      },
      reviewTime: {
        type: Date,
      },
      message: {
        type: String,
      },
      images: {
        type: [String],
      },
    },
    productDetails: {
      type: String,
    },
    specification: {
      type: String,
    },
    wishlist: {
      type: [String],
    },
    warranty: {
      type: String,
    },
    event: {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      productId: {
        type: [String],
      },
      sellerId: {
        type: [String],
      },
      eventTime: {
        type: String,
      },
    },
    sku: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<IProduct, ProductModel>('Product', productSchema);
