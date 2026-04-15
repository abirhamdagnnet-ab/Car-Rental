import toyota1 from '../../assets/images/cars/toyota-1.png';
import toyota2 from '../../assets/images/cars/toyota-2.png';
import toyota3 from '../../assets/images/cars/toyota-3.png';
import tesla2 from '../../assets/images/cars/tesla-2.png';
import sport1 from '../../assets/images/cars/sport-1.png';
import lamberg1 from '../../assets/images/cars/lamberg-1.png';
import lamberg2 from '../../assets/images/cars/lamberg-2.png';
import lamberg3 from '../../assets/images/cars/lamberg-3.png';

export const mockCars = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Camry',
    pricePerDay: 50,
    status: 'available',
    year: 2023,
    category: 'Sedan',
    image: toyota1,
  },
  {
    id: '2',
    brand: 'Honda',
    model: 'Civic',
    pricePerDay: 45,
    status: 'available',
    year: 2023,
    category: 'Sedan',
    image: toyota2,
  },
  {
    id: '3',
    brand: 'Ford',
    model: 'Mustang',
    pricePerDay: 85,
    status: 'available',
    year: 2023,
    category: 'Sports',
    image: sport1,
  },
  {
    id: '4',
    brand: 'Tesla',
    model: 'Model 3',
    pricePerDay: 95,
    status: 'available',
    year: 2024,
    category: 'Electric',
    image: tesla2,
  },
  {
    id: '5',
    brand: 'BMW',
    model: 'X5',
    pricePerDay: 120,
    status: 'available',
    year: 2023,
    category: 'SUV',
    image: lamberg2,
  },
  {
    id: '6',
    brand: 'Mercedes',
    model: 'C-Class',
    pricePerDay: 110,
    status: 'available',
    year: 2023,
    category: 'Luxury',
    image: lamberg3,
  },
  {
    id: '7',
    brand: 'Audi',
    model: 'A4',
    pricePerDay: 100,
    status: 'rented',
    year: 2023,
    category: 'Luxury',
    image: lamberg1,
  },
  {
    id: '8',
    brand: 'Jeep',
    model: 'Wrangler',
    pricePerDay: 75,
    status: 'available',
    year: 2023,
    category: 'SUV',
    image: toyota3,
  },
];

export const mockCustomers = [
  { id: '1', fullName: 'John Doe', email: 'john@example.com', phone: '+1234567890', licenseNumber: 'DL123456' },
  { id: '2', fullName: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', licenseNumber: 'DL789012' },
  { id: '3', fullName: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', licenseNumber: 'DL345678' },
];

export const mockRentals = [
  {
    id: '1',
    carId: '7',
    customerId: '1',
    userId: '2',
    days: 5,
    totalPrice: 500,
    status: 'active',
    startDate: '2026-04-05',
  },
];

export class DataStore {
  static cars = [...mockCars];
  static customers = [...mockCustomers];
  static rentals = [...mockRentals];

  static getCars() {
    return [...this.cars];
  }

  static addCar(car) {
    const newCar = { ...car, id: String(Date.now()) };
    this.cars.push(newCar);
    return newCar;
  }

  static updateCar(id, updates) {
    const index = this.cars.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.cars[index] = { ...this.cars[index], ...updates };
      return this.cars[index];
    }
    return null;
  }

  static deleteCar(id) {
    this.cars = this.cars.filter((c) => c.id !== id);
  }

  static getCustomers() {
    return [...this.customers];
  }

  static addCustomer(customer) {
    const existing = this.customers.find((c) => c.email === customer.email);
    if (existing) return existing;

    const newCustomer = { ...customer, id: String(Date.now()) };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  static updateCustomer(id, updates) {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.customers[index] = { ...this.customers[index], ...updates };
      return this.customers[index];
    }
    return null;
  }

  static deleteCustomer(id) {
    this.customers = this.customers.filter((c) => c.id !== id);
  }

  static getRentals() {
    return [...this.rentals];
  }

  static addRental(rental) {
    const newRental = { ...rental, id: String(Date.now()) };
    this.rentals.push(newRental);

    this.updateCar(rental.carId, { status: 'rented' });

    return newRental;
  }

  static completeRental(id) {
    const rental = this.rentals.find((r) => r.id === id);
    if (rental) {
      rental.status = 'completed';
      rental.endDate = new Date().toISOString().split('T')[0];
      this.updateCar(rental.carId, { status: 'available' });
    }
  }

  static getUserRentals(userId) {
    return this.rentals.filter((r) => r.userId === userId);
  }
}
