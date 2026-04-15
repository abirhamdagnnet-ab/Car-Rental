import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer({ className = '' }) {
  return (
    <footer className={`border-t border-border bg-background/95 ${className}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold">
            <span className="text-primary">Car</span>
            <span className="text-amber-600 dark:text-amber-300">Rental</span>
          </p>
          <p className="text-muted-foreground">Reliable rides for every journey.</p>
        </div>

        <div className="grid gap-2 text-muted-foreground">
          <p className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Bahair
          </p>
          <p className="inline-flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            +254 700 000 000
          </p>
          <p className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            support@carrental.system
          </p>
        </div>
      </div>
    </footer>
  );
}
