import { useState } from 'react';
import { DataStore } from '../../data/store';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import defaultCarImage from '../../../assets/images/cars/default-car.svg';

export default function BrowseCars() {
  const [cars] = useState(DataStore.getCars());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const navigate = useNavigate();
  const { user } = useAuth();

  const availableCars = cars.filter((c) => c.status === 'available');

  const filteredCars = availableCars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || car.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(cars.map((c) => c.category).filter(Boolean)));

  const handleRentClick = (carId) => {
    if (!user || user.role !== 'user') {
      navigate('/login');
      return;
    }

    navigate(`/user/rent/${carId}`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl text-foreground">Car</h1>
        <p className="text-muted-foreground">Find your perfect rental car</p>
      </div>

      <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-input bg-input-background py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-lg border border-input bg-input-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
              <img
                src={car.image || defaultCarImage}
                alt={`${car.brand} ${car.model}`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-[1.2deg]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-45 transition-opacity duration-500 group-hover:opacity-70" />

              <div className="absolute right-3 top-3">
                <span className="rounded-full bg-green-500 px-3 py-1 text-xs text-white shadow-md">
                  Available
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-3">
                <h3 className="mb-1 text-xl">
                  {car.brand} {car.model}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {car.category} | {car.year}
                </p>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-2xl text-primary">${car.pricePerDay}</p>
                  <p className="text-xs text-muted-foreground">per day</p>
                </div>
              </div>

              <button
                onClick={() => handleRentClick(car.id)}
                className="w-full rounded-lg bg-primary py-2.5 text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
              >
                {user?.role === 'user' ? 'Rent Now' : 'Sign In to Rent'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No cars found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
