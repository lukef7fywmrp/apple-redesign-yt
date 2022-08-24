// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { urlFor } from "../../sanity";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const items: Product[] = req.body.items;

    // This is the shape in which stripe expects the data to be
    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [urlFor(item.image[0]).url()],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    try {
      // Create Checkout Sessions from body params
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        // shipping_address_collection: {
        //   allowed_countries: ["US", "CA", "GB"],
        // },
        line_items: transformedItems,
        payment_intent_data: {},
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/checkout`,
        metadata: {
          images: JSON.stringify(items.map((item) => item.image[0].asset.url)),
        },
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
