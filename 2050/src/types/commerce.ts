/** Provider-neutral contracts only. No provider SDK or live commerce behavior in Phase 1. */
export type CommerceProvider = "undecided";

export interface ProductVariantReference {
  id: string;
  label: string;
  available?: boolean;
}

export interface CommerceProductReference {
  id: string;
  handle: string;
  title: string;
  currency: "INR";
  /** Integer minor units (paise), never a formatted display string. */
  priceMinor: number;
  variants: readonly ProductVariantReference[];
}

export interface CartLineReference {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CheckoutHandoff {
  provider: CommerceProvider;
  /** A real checkout URL is supplied only by a future approved provider integration. */
  checkoutUrl?: never;
}
