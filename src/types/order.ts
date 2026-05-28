export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

export interface Order {
  id: string;
  user_id: string | null;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  shipping_address: Record<string, any>;
  status: OrderStatus;
  payment_status: PaymentStatus;
  stripe_payment_intent_id: string | null;
  stripe_charge_id: string | null;
  currency: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  discount: number;
  total: number;
  tracking_number: string | null;
  carrier: string | null;
  shipped_at: string | null;
  estimated_delivery: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_slug: string;
  product_title: string;
  product_image: string | null;
  size: string;
  unit_price: number;
  quantity: number;
  line_total: number;
  created_at: string;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}
