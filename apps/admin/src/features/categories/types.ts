export type CategoryItem = {
  id: string;
  name: string;
  image: string;
};

export type ProductStatus = "all" | "featured" | "sale" | "out_of_stock";

export type ProductItem = {
  id: string;
  name: string;
  image: string;
  createdDate: string;
  order: number;
  status: Exclude<ProductStatus, "all"> | "normal";
};