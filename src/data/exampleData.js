export const merchants = [
  {
    id: "merc1",
    name: "Cafe Istanbul",
    address: "İstiklal Cad. No:100, Beyoğlu, İstanbul",
    created_at: "2025-06-20 09:00:00",
  },
  {
    id: "merc2",
    name: "Bistro Ankara",
    address: "Atatürk Blv. No:20, Çankaya, Ankara",
    created_at: "2025-06-21 10:30:00",
  },
];

export const categories = [
  { id: 1, merchant_id: "merc1", category_key: "coffee", label: "Kahve", sort_order: 1 },
  { id: 2, merchant_id: "merc1", category_key: "sandwich", label: "Sandviç", sort_order: 2 },
  { id: 3, merchant_id: "merc1", category_key: "dessert", label: "Tatlı", sort_order: 3 },
  { id: 4, merchant_id: "merc2", category_key: "salad", label: "Salata", sort_order: 1 },
  { id: 5, merchant_id: "merc2", category_key: "pizza", label: "Pizza", sort_order: 2 },
  { id: 6, merchant_id: "merc2", category_key: "drink", label: "İçecek", sort_order: 3 },
];

export const menu_items = [
  {
    id: 1,
    merchant_id: "merc1",
    category_id: 1,
    name: "Espresso",
    description: "Güçlü siyah kahve",
    price: 15.0,
    image_path: "/images/espresso.jpg",
    like_count: 5,
    created_at: "2025-06-20 09:20:00",
  },
  {
    id: 2,
    merchant_id: "merc1",
    category_id: 2,
    name: "Hindi Sandviç",
    description: "Hindi ve peynirli sandviç",
    price: 30.0,
    image_path: "/images/turkey_sandwich.jpg",
    like_count: 3,
    created_at: "2025-06-20 09:25:00",
  },
  {
    id: 3,
    merchant_id: "merc2",
    category_id: 5,
    name: "Margherita Pizza",
    description: "Klasik domatesli ve peynirli pizza",
    price: 80.0,
    image_path: "/images/margherita.jpg",
    like_count: 8,
    created_at: "2025-06-21 10:50:00",
  },
  {
    id: 4,
    merchant_id: "merc2",
    category_id: 6,
    name: "Limonata",
    description: "Taze limonata",
    price: 25.0,
    image_path: "/images/lemonade.jpg",
    like_count: 4,
    created_at: "2025-06-21 10:55:00",
  },
];

export const tables = [
  { id: 1, merchant_id: "merc1", label: "T1", created_at: "2025-06-20 09:15:00" },
  { id: 2, merchant_id: "merc1", label: "T2", created_at: "2025-06-20 09:15:00" },
  { id: 3, merchant_id: "merc2", label: "T1", created_at: "2025-06-21 10:45:00" },
  { id: 4, merchant_id: "merc2", label: "T2", created_at: "2025-06-21 10:45:00" },
];

export const orders = [
  {
    id: 1,
    table_id: 1,
    merchant_id: "merc1",
    payment_status: "pending",
    order_status: "pending",
    created_at: "2025-06-20 09:30:00",
    items: [
      { menu_item_id: 1, qty: 1 },
      { menu_item_id: 2, qty: 2 },
    ],
  },
  {
    id: 2,
    table_id: 3,
    merchant_id: "merc2",
    payment_status: "paid",
    order_status: "ready",
    created_at: "2025-06-21 11:00:00",
    items: [
      { menu_item_id: 3, qty: 1 },
      { menu_item_id: 4, qty: 3 },
    ],
  },
];

export const comments = [
  { id: 1, menu_item_id: 2, comment: "Çok lezzetliydi, teşekkürler!", created_at: "2025-06-20 09:26:00" },
  { id: 2, menu_item_id: 4, comment: "Gerçekten ferahlatıcı bir içecek.", created_at: "2025-06-21 10:57:00" },
];

export const likes = [
  { id: 1, menu_item_id: 1, user_id: "user123", created_at: "2025-06-20 09:21:00" },
  { id: 2, menu_item_id: 3, user_id: "user456", created_at: "2025-06-21 10:52:00" },
];
