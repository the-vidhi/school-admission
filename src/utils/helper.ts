import { Model } from "mongoose";

export const paginate = async (
  model: Model<any>,
  query: any,
  page: number = 1,
  limit: number = 10,
  projection: any = {},
  sortOptions: { orderBy: string; sortOrder: 1 | -1 } = { orderBy: "createdAt", sortOrder: -1 }
) => {
  const skip = (page - 1) * limit;
  const sortQuery = { [sortOptions.orderBy]: sortOptions.sortOrder };

  const [results, total] = await Promise.all([model.find(query, projection).sort(sortQuery).skip(skip).limit(limit), model.countDocuments(query)]);

  const totalPages = Math.ceil(total / limit);

  return {
    results,
    total,
    currentPage: page,
    totalPages,
    pageSize: results.length
  };
};
