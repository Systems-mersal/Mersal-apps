import type { Car } from "../types/car";

export type BookingStatus = "active" | "pending" | "completed" | "cancelled";

export type Booking = {
  id: string;
  car: Car;
  status: BookingStatus;
  from: string;
  to: string;
  fromEn: string;
  toEn: string;
  total: number;
};

export const cars: Car[] = [
  {
    id: "1",
    brand: "تويوتا",
    model: "كامري",
    brandEn: "Toyota",
    modelEn: "Camry",
    year: 2024,
    transmission: "أوتوماتيك",
    transmissionEn: "Automatic",
    fuel: "بنزين",
    fuelEn: "Petrol",
    seats: 5,
    price: 180,
    rating: 4.8,
    reviews: 124,
    company: "الخليج للتأجير",
    companyEn: "Gulf Rental",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=440&fit=crop&auto=format",
    available: true,
    category: "sedan",
    badge: "الأكثر طلباً",
    mileage: "غير محدود",
  },
  {
    id: "2",
    brand: "نيسان",
    model: "باترول",
    brandEn: "Nissan",
    modelEn: "Patrol",
    year: 2023,
    transmission: "أوتوماتيك",
    transmissionEn: "Automatic",
    fuel: "بنزين",
    fuelEn: "Petrol",
    seats: 7,
    price: 350,
    rating: 4.9,
    reviews: 87,
    company: "بدر للسيارات",
    companyEn: "Badr Cars",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=440&fit=crop&auto=format",
    available: true,
    category: "suv",
    badge: "مميز",
    mileage: "300 كم/يوم",
  },
  {
    id: "3",
    brand: "هيونداي",
    model: "إيلانترا",
    brandEn: "Hyundai",
    modelEn: "Elantra",
    year: 2024,
    transmission: "أوتوماتيك",
    transmissionEn: "Automatic",
    fuel: "بنزين",
    fuelEn: "Petrol",
    seats: 5,
    price: 120,
    rating: 4.6,
    reviews: 203,
    company: "العربية للتأجير",
    companyEn: "Arabian Rental",
    image:
      "https://images.unsplash.com/photo-1549399542-7d3b0e25b98c?w=800&h=440&fit=crop&auto=format",
    available: true,
    category: "economy",
    mileage: "غير محدود",
  },
  {
    id: "4",
    brand: "BMW",
    model: "الفئة السابعة",
    brandEn: "BMW",
    modelEn: "7 Series",
    year: 2024,
    transmission: "أوتوماتيك",
    transmissionEn: "Automatic",
    fuel: "بنزين",
    fuelEn: "Petrol",
    seats: 5,
    price: 550,
    rating: 4.9,
    reviews: 56,
    company: "الخليج للتأجير",
    companyEn: "Gulf Rental",
    image:
      "https://images.unsplash.com/photo-1555215695-3d98baf72a82?w=800&h=440&fit=crop&auto=format",
    available: true,
    category: "luxury",
    badge: "VIP",
    mileage: "200 كم/يوم",
  },
  {
    id: "5",
    brand: "فورد",
    model: "F-150",
    brandEn: "Ford",
    modelEn: "F-150",
    year: 2023,
    transmission: "أوتوماتيك",
    transmissionEn: "Automatic",
    fuel: "بنزين",
    fuelEn: "Petrol",
    seats: 5,
    price: 280,
    rating: 4.7,
    reviews: 91,
    company: "بدر للسيارات",
    companyEn: "Badr Cars",
    image:
      "https://images.unsplash.com/photo-1544636331-9cdba3e06093?w=800&h=440&fit=crop&auto=format",
    available: false,
    category: "pickup",
    mileage: "250 كم/يوم",
  },
  {
    id: "6",
    brand: "تويوتا",
    model: "هايلاكس",
    brandEn: "Toyota",
    modelEn: "Hilux",
    year: 2024,
    transmission: "يدوي",
    transmissionEn: "Manual",
    fuel: "ديزل",
    fuelEn: "Diesel",
    seats: 5,
    price: 240,
    rating: 4.5,
    reviews: 67,
    company: "العربية للتأجير",
    companyEn: "Arabian Rental",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=440&fit=crop&auto=format",
    available: true,
    category: "pickup",
    mileage: "300 كم/يوم",
  },
];

export const bookings: Booking[] = [
  {
    id: "BK-2024-001",
    car: cars[0],
    status: "active",
    from: "١٥ يناير",
    to: "١٨ يناير",
    fromEn: "Jan 15",
    toEn: "Jan 18",
    total: 540,
  },
  {
    id: "BK-2024-002",
    car: cars[1],
    status: "pending",
    from: "٢٠ يناير",
    to: "٢٥ يناير",
    fromEn: "Jan 20",
    toEn: "Jan 25",
    total: 1750,
  },
  {
    id: "BK-2024-003",
    car: cars[2],
    status: "completed",
    from: "٥ يناير",
    to: "٨ يناير",
    fromEn: "Jan 5",
    toEn: "Jan 8",
    total: 360,
  },
  {
    id: "BK-2024-004",
    car: cars[3],
    status: "cancelled",
    from: "١ يناير",
    to: "٣ يناير",
    fromEn: "Jan 1",
    toEn: "Jan 3",
    total: 1100,
  },
];

export function getCarById(id: string): Car | undefined {
  return cars.find((car) => car.id === id);
}

