import { jsx, jsxs } from "react/jsx-runtime";
import { DataStore } from "../../data/store";
import { Car, Users, DollarSign, CheckCircle } from "lucide-react";
function AdminDashboard() {
  const cars = DataStore.getCars();
  const customers = DataStore.getCustomers();
  const rentals = DataStore.getRentals();
  const totalCars = cars.length;
  const availableCars = cars.filter((c) => c.status === "available").length;
  const rentedCars = cars.filter((c) => c.status === "rented").length;
  const totalCustomers = customers.length;
  const stats = [
    {
      title: "Total Cars",
      value: totalCars,
      icon: Car,
      bgColor: "bg-blue-500",
      textColor: "text-blue-500",
      bgLight: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
      title: "Available Cars",
      value: availableCars,
      icon: CheckCircle,
      bgColor: "bg-green-500",
      textColor: "text-green-500",
      bgLight: "bg-green-50 dark:bg-green-950/30"
    },
    {
      title: "Rented Cars",
      value: rentedCars,
      icon: DollarSign,
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-500",
      bgLight: "bg-yellow-50 dark:bg-yellow-950/30"
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: Users,
      bgColor: "bg-purple-500",
      textColor: "text-purple-500",
      bgLight: "bg-purple-50 dark:bg-purple-950/30"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl text-foreground mb-2", children: "Admin Dashboard" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Welcome back! Here's your system overview." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: stats.map((stat) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: stat.title }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl", children: stat.value })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `w-12 h-12 ${stat.bgLight} rounded-xl flex items-center justify-center`, children: /* @__PURE__ */ jsx(stat.icon, { className: `w-6 h-6 ${stat.textColor}` }) })
        ] })
      },
      stat.title
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl mb-4", children: "Recent Rentals" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          rentals.slice(0, 5).map((rental) => {
            const car = cars.find((c) => c.id === rental.carId);
            const customer = customers.find((c) => c.id === rental.customerId);
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3 bg-muted rounded-lg",
                children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                      car?.brand,
                      " ",
                      car?.model
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: customer?.fullName })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                      "$",
                      rental.totalPrice
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-1 rounded ${rental.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"}`, children: rental.status })
                  ] })
                ]
              },
              rental.id
            );
          }),
          rentals.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-4", children: "No rentals yet" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl mb-4", children: "Available Cars" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: cars.filter((c) => c.status === "available").slice(0, 5).map((car) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 bg-muted rounded-lg",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  car.brand,
                  " ",
                  car.model
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: car.category })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                  "$",
                  car.pricePerDay,
                  "/day"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 rounded", children: "Available" })
              ] })
            ]
          },
          car.id
        )) })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as default
};

