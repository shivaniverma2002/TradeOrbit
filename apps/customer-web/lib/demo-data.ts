export type DemoCategory = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type DemoProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
  rating: number;
  reviewCount: number;
  image: string;
};

export const demoNotice =
  "Demonstration catalog only: sample products, sample prices and no live inventory.";

export const demoCategories: DemoCategory[] = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Everyday tech and audio picks",
    image: "/images/category-electronics.svg"
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Wardrobe staples and accessories",
    image: "/images/category-fashion.svg"
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Practical pieces for your space",
    image: "/images/category-home.svg"
  },
  {
    id: "beauty",
    name: "Beauty",
    description: "Personal care demonstrations",
    image: "/images/category-beauty.svg"
  }
];

export const demoProducts: DemoProduct[] = [
  {
    id: "headphones",
    name: "Wireless Over-Ear Headphones",
    category: "Electronics",
    price: 89,
    originalPrice: 129,
    discountLabel: "31% off",
    rating: 4.8,
    reviewCount: 324,
    image: "/images/product-headphones.svg"
  },
  {
    id: "sneakers",
    name: "Everyday Court Sneakers",
    category: "Fashion",
    price: 64,
    originalPrice: 89,
    discountLabel: "28% off",
    rating: 4.6,
    reviewCount: 218,
    image: "/images/product-sneakers.svg"
  },
  {
    id: "watch",
    name: "Minimal Analog Watch",
    category: "Fashion",
    price: 118,
    originalPrice: 149,
    discountLabel: "21% off",
    rating: 4.7,
    reviewCount: 156,
    image: "/images/product-watch.svg"
  },
  {
    id: "backpack",
    name: "Commuter Daypack",
    category: "Fashion",
    price: 72,
    rating: 4.5,
    reviewCount: 94,
    image: "/images/product-backpack.svg"
  },
  {
    id: "lamp",
    name: "Arc Desk Lamp",
    category: "Home & Living",
    price: 46,
    originalPrice: 59,
    discountLabel: "22% off",
    rating: 4.4,
    reviewCount: 77,
    image: "/images/product-lamp.svg"
  },
  {
    id: "serum",
    name: "Botanical Daily Serum",
    category: "Beauty",
    price: 28,
    rating: 4.8,
    reviewCount: 412,
    image: "/images/product-skincare.svg"
  },
  {
    id: "coffee",
    name: "Compact Coffee Brewer",
    category: "Home & Living",
    price: 96,
    originalPrice: 129,
    discountLabel: "26% off",
    rating: 4.6,
    reviewCount: 183,
    image: "/images/product-coffee.svg"
  },
  {
    id: "camera",
    name: "Compact Mirrorless Camera",
    category: "Electronics",
    price: 329,
    originalPrice: 399,
    discountLabel: "18% off",
    rating: 4.9,
    reviewCount: 61,
    image: "/images/product-camera.svg"
  }
];

export const featuredProducts = demoProducts.slice(0, 4);
export const trendingProducts = demoProducts.filter((product) => product.originalPrice);

export const demoVendor = {
  name: "Cedar & Coast Goods",
  headline: "A demo storefront for thoughtful everyday essentials.",
  note: "Featured vendor profile is demonstration content only."
};
