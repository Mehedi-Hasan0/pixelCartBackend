import { SortOrder } from 'mongoose';

interface IOptionResult {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
}

interface IOption {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}

const calculatePagination = (option: IOption): IOptionResult => {
  const page = Number(option.page || 1);
  const limit = Number(option.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = option.sortBy || 'createdAt';
  const sortOrder = option.sortOrder || 'asc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = { calculatePagination };
