import { User } from './user.model';

// for buyer
export const findLastBuyerId = async (): Promise<string | undefined> => {
  const lastBuyer = await User.findOne(
    {
      role: 'buyer',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastBuyer?.id ? lastBuyer.id.split('-')[1] : undefined; // ex : lastBuyer = "Buyer-00001" => split("-") => ["Buyer", "00001"] => [1] => "00001"
};

export const generateBuyerId = async (): Promise<string> => {
  const currentId =
    (await findLastBuyerId()) || (0).toString().padStart(5, '0');

  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `Buyer-${incrementedId}`;

  return incrementedId;
};

// for seller
export const findLastSellerId = async (): Promise<string | undefined> => {
  const lastSeller = await User.findOne(
    {
      role: 'seller',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastSeller?.id ? lastSeller.id.split('-')[1] : undefined;
};

export const generateSellerId = async (): Promise<string> => {
  const currentId =
    (await findLastSellerId()) || (0).toString().padStart(5, '0');

  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `Seller-${incrementedId}`;

  return incrementedId;
};

// for admin
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.split('-')[1] : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');

  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `Admin-${incrementedId}`;

  return incrementedId;
};
