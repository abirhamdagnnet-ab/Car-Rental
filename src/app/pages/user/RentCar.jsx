import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Check } from 'lucide-react';
import { DataStore } from '../../data/store';
import { useAuth } from '../../context/AuthContext';

export default function RentCar() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [car] = useState(() => DataStore.getCars().find((c) => c.id === carId));
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    licenseNumber: '',
    days: '1',
  });

  useEffect(() => {
    if (!car || car.status !== 'available') {
      navigate('/user/cars');
    }
  }, [car, navigate]);

  if (!car) return null;

  const totalPrice = car.pricePerDay * Number(formData.days);

  const handleSubmit = (e) => {
    e.preventDefault();

    const customer = DataStore.addCustomer({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      licenseNumber: formData.licenseNumber,
    });

    DataStore.addRental({
      carId: car.id,
      customerId: customer.id,
      userId: user.id,
      days: Number(formData.days),
      totalPrice,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
    });

    setShowSuccess(true);
    setTimeout(() => {
      navigate('/user/my-rentals');
    }, 1400);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <button
          onClick={() => navigate('/user/cars')}
          className="mb-4 inline-flex items-center gap-2 text-primary hover:underline"
          type="button"
        >
          ? Back to Car
        </button>
        <h1 className="mb-2 text-3xl text-foreground">Rent a Car</h1>
        <p className="text-muted-foreground">Complete the form to rent this vehicle</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-fit rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
            {car.image ? (
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-6xl opacity-20">??</div>
            )}
          </div>
          <h2 className="mb-2 text-2xl">
            {car.brand} {car.model}
          </h2>
          <p className="mb-4 text-muted-foreground">
            {car.category} • {car.year}
          </p>

          <div className="space-y-2">
            <div className="flex justify-between rounded-lg bg-muted p-3">
              <span className="text-sm text-muted-foreground">Price per Day</span>
              <span className="text-sm">${car.pricePerDay}</span>
            </div>
            <div className="flex justify-between rounded-lg bg-muted p-3">
              <span className="text-sm text-muted-foreground">Rental Days</span>
              <span className="text-sm">{formData.days}</span>
            </div>
            <div className="flex justify-between rounded-lg border-2 border-primary/20 bg-primary/10 p-4">
              <span className="text-primary">Total Price</span>
              <span className="text-2xl text-primary">${totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-xl">Rental Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+1 234 567 8900"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">License Number</label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="DL123456"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Rental Days</label>
              <input
                type="number"
                min="1"
                max="365"
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                className="w-full rounded-lg border border-input bg-input-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/user/cars')}
                className="flex-1 rounded-lg bg-secondary px-4 py-3 text-secondary-foreground transition-all hover:opacity-90"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-primary px-4 py-3 text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
              >
                Confirm Rental
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-2 text-2xl">Rental Confirmed!</h2>
            <p className="mb-4 text-muted-foreground">
              Your car rental has been successfully created. Redirecting to your rentals...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
