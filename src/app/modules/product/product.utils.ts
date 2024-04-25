import { Product } from './product.model';

export const findLastProduct = async (): Promise<string | undefined> => {
  const lastProduct = await Product.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastProduct?.id ? lastProduct.id.split('-')[1] : undefined;
};

export const generateProductId = async (): Promise<string> => {
  const currentId =
    (await findLastProduct()) || (0).toString().padStart(5, '0');

  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `P-${incrementedId}`;

  return incrementedId;
};

export const generateSku = (id: string) => {
  const randomNumber = Math.round(Math.random() * 1000000);

  return `${randomNumber}_BD-${id}`;
};
