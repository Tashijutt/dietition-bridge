
export interface Dietitian {
  id: number;
  name: string;
  qualifications: string;
  city: string;
  specializations: string[];
  contact: {
    email: string;
    phone: string;
  };
  clinic: string;
  image: string;
  rating: number;
  reviewCount: number;
  about: string;
  experience: string;
  satisfiedPatients: string;
  fee: string;
  availability: string;
}
