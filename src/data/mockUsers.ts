
export interface User {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  lastLogin: string;
  status: "active" | "inactive" | "banned";
  role: "admin" | "user" | "dietitian";
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  profileImage?: string;
  healthConditions?: string[];
  dietaryPreferences?: string[];
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    registrationDate: "2023-11-15",
    lastLogin: "2023-11-22",
    status: "active" as const,
    role: "user" as const,
    phone: "+92 300 1234567",
    address: "123 Main St, Islamabad",
    dateOfBirth: "1990-05-15",
    healthConditions: ["Diabetes"],
    dietaryPreferences: ["Vegetarian"]
  },
  {
    id: "2",
    name: "Muhammad Ali",
    email: "mali@example.com",
    registrationDate: "2023-11-14",
    lastLogin: "2023-11-20",
    status: "active" as const,
    role: "user" as const,
    phone: "+92 321 1234567",
    address: "456 Oak St, Lahore",
    dateOfBirth: "1985-08-20",
    healthConditions: ["Hypertension"],
    dietaryPreferences: ["Low-sodium"]
  },
  {
    id: "3",
    name: "Fatima Zahra",
    email: "fatima@example.com",
    registrationDate: "2023-11-14",
    lastLogin: "2023-11-18",
    status: "inactive" as const,
    role: "user" as const,
    phone: "+92 333 1234567",
    address: "789 Pine St, Karachi",
    dateOfBirth: "1992-03-10"
  },
  {
    id: "4",
    name: "Ahmed Raza",
    email: "ahmed@example.com",
    registrationDate: "2023-11-13",
    lastLogin: "2023-11-15",
    status: "active" as const,
    role: "dietitian" as const,
    phone: "+92 345 1234567",
    address: "101 Elm St, Faisalabad",
    dateOfBirth: "1980-11-25",
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: "5",
    name: "Saira Batool",
    email: "saira@example.com",
    registrationDate: "2023-11-12",
    lastLogin: "2023-11-12",
    status: "banned" as const,
    role: "user" as const,
    phone: "+92 312 1234567",
    address: "202 Maple St, Peshawar",
    dateOfBirth: "1995-07-02"
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@dietitianbridge.com",
    registrationDate: "2023-10-01",
    lastLogin: "2023-11-23",
    status: "active" as const,
    role: "admin" as const,
    phone: "+92 300 9876543",
    address: "Admin Office, Islamabad",
    dateOfBirth: "1985-01-15"
  },
  {
    id: "dietitian1",
    name: "Dr. Ayesha Ahmed",
    email: "dietitian@example.com",
    registrationDate: "2023-10-10",
    lastLogin: "2023-11-21",
    status: "active" as const,
    role: "dietitian" as const,
    phone: "+92 321 9876543",
    address: "Nutrition Clinic, Lahore",
    dateOfBirth: "1978-06-22",
    profileImage: "https://randomuser.me/api/portraits/women/28.jpg"
  }
];
