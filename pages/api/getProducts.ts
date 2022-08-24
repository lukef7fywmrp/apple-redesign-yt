// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";

const query = groq`*[_type == "product"] {
_id,
  ...
} | order(_createdAt asc)`;

type Data = {
  products: Product[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const products: Product[] = await sanityClient.fetch(query);
  console.log(products);
  res.status(200).json({ products });
}
