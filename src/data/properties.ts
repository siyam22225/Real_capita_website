export type PropertyItem = {
  id: number;
  slug: string;
  title: string;
  type: string;
  location: string;
  price: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  status: "Available" | "Booked" | "Sold Out";
  image: string;
  mapEmbedUrl: string;
  shortDescription: string;
  fullDescription: string[];
};

export const propertyItems: PropertyItem[] = [
  {
    id: 1,
    slug: "lake-view-apartment-dhaka",
    title: "Lake View Apartment",
    type: "Apartment",
    location: "Uttara, Dhaka",
    price: "BDT 85,00,000",
    size: "1450 sft",
    bedrooms: 3,
    bathrooms: 3,
    status: "Available",
    image: "/images/enterprises/enterprise-1.jpg",
    shortDescription: "A modern apartment in a prime residential area.",
    fullDescription: [
      "This apartment offers a comfortable family living experience in a well-connected location.",
      "It includes spacious bedrooms, a modern layout, and easy access to nearby schools, hospitals, and shopping areas.",
      "This property is suitable for buyers looking for both convenience and long-term value."
    ],
    mapEmbedUrl: "https://maps.google.com/maps?q=Uttara%20Dhaka&z=15&output=embed"
  },
  {
    id: 2,
    slug: "green-city-residential-plot",
    title: "Green City Residential Plot",
    type: "Land",
    location: "Keraniganj, Dhaka",
    price: "BDT 32,00,000",
    size: "3 Katha",
    bedrooms: 0,
    bathrooms: 0,
    status: "Available",
    image: "/images/enterprises/enterprise-2.jpg",
    shortDescription: "A promising residential land project for future development.",
    fullDescription: [
      "This plot is located in a growing area with strong future development potential.",
      "It is suitable for residential construction and long-term investment.",
      "The surrounding environment is peaceful and ideal for planned housing."
    ],
    mapEmbedUrl: "https://maps.google.com/maps?q=Keraniganj%20Dhaka&z=15&output=embed"
  },
  {
    id: 3,
    slug: "commercial-space-gulshan",
    title: "Commercial Space",
    type: "Commercial",
    location: "Gulshan, Dhaka",
    price: "BDT 1,45,00,000",
    size: "1800 sft",
    bedrooms: 0,
    bathrooms: 2,
    status: "Booked",
    image: "/images/enterprises/enterprise-3.jpg",
    shortDescription: "A premium commercial space in a high-demand business zone.",
    fullDescription: [
      "This commercial unit is located in a strong business district with high visibility.",
      "It is suitable for office setup, showroom use, or business expansion.",
      "The space is designed for practical use and long-term business value."
    ],
    mapEmbedUrl: "https://maps.google.com/maps?q=Gulshan%20Dhaka&z=15&output=embed"
  },
  {
    id: 4,
    slug: "family-apartment-mirpur",
    title: "Family Apartment",
    type: "Apartment",
    location: "Mirpur, Dhaka",
    price: "BDT 72,00,000",
    size: "1320 sft",
    bedrooms: 3,
    bathrooms: 2,
    status: "Sold Out",
    image: "/images/enterprises/enterprise-4.jpg",
    shortDescription: "A family-friendly apartment in a convenient location.",
    fullDescription: [
      "This apartment is designed for modern family living with a functional layout.",
      "It offers good access to transport, education facilities, and daily essentials.",
      "It is ideal for buyers who value both affordability and practical living."
    ],
    mapEmbedUrl: "https://maps.google.com/maps?q=Mirpur%20Dhaka&z=15&output=embed"
  }
];