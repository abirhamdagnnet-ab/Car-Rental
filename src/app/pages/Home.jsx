import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import locationImage from '../../assets/images/cars/lamberg-2.png';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1920&q=80';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-10 sm:px-6">
      <section className="text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-primary">Welcome</p>
        <h1 className="mx-auto max-w-3xl text-4xl leading-tight sm:text-5xl">
          Reliable <span className="text-primary">Cars</span>. Fair Prices. Fast Booking.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          <span className="font-semibold">
            <span className="text-primary">Car</span>
            <span className="text-amber-600 dark:text-amber-300">Rental</span>
          </span>{' '}
          helps you find comfortable, safe, and affordable cars for business trips, family travel,
          and daily commute.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/cars')}
            className="rounded-md bg-primary px-5 py-2.5 text-primary-foreground transition-opacity hover:opacity-90"
          >
            View Car
          </button>
          <button
            type="button"
            onClick={() => navigate(user ? '/user/home' : '/login')}
            className="rounded-md border border-border px-5 py-2.5 transition-colors hover:bg-accent"
          >
            {user ? 'Go to Account' : 'Sign In'}
          </button>
        </div>
      </section>

      <section className="group relative mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-primary/5 hover:shadow-2xl">
        <img
          src={HERO_IMAGE}
          alt="Modern car lineup"
          className="h-[260px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[380px] lg:h-[520px]"
        />
        <div className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />
      </section>

      <section className="group mt-10 grid gap-6 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:bg-primary/5 hover:shadow-xl md:grid-cols-2 md:p-6">
        <div className="flex flex-col justify-center transition-transform duration-500 group-hover:translate-x-1">
          <h2 className="mb-3 text-2xl">
            Company Location:
            <span className="ml-2 text-primary">Bahair</span>
          </h2>
          <p className="text-muted-foreground transition-colors duration-500 group-hover:text-foreground/90">
            Our support and rental office is located in Bahair. Visit us for quick booking help,
            in-person assistance, and the best available deals on your next ride.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl">
          <img
            src={locationImage}
            alt="CarRental branch location visual"
            className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-72"
          />
          <div className="pointer-events-none absolute inset-0 bg-amber-400/0 transition-colors duration-500 group-hover:bg-amber-400/10" />
        </div>
      </section>
    </div>
  );
}
