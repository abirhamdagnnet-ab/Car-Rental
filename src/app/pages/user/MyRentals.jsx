import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DataStore } from "../../data/store";
import { useAuth } from "../../context/AuthContext";
import { Calendar, DollarSign } from "lucide-react";
function MyRentals() {
  const { user } = useAuth();
  const [rentals] = useState(DataStore.getUserRentals(user.id));
  const [cars] = useState(DataStore.getCars());
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl text-foreground mb-2", children: "My Rentals" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "View your rental history and active rentals" })
    ] }),
    rentals.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-12 text-center shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "text-6xl mb-4 opacity-20", children: "\u{1F697}" }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl mb-2", children: "No Rentals Yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "You haven't rented any cars. Browse our collection to get started!" }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/user/cars",
          className: "inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all shadow-md",
          children: "Car"
        }
      )
    ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      rentals.filter((r) => r.status === "active").length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl mb-4", children: "Active Rentals" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: rentals.filter((r) => r.status === "active").map((rental) => {
          const car = cars.find((c) => c.id === rental.carId);
          if (!car) return null;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "bg-card border-2 border-primary/30 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden",
              children: [
                /* @__PURE__ */ jsx("div", { className: "h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden", children: car.image ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: car.image,
                    alt: `${car.brand} ${car.model}`,
                    className: "w-full h-full object-cover"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "text-5xl opacity-20", children: "\u{1F697}" }) }),
                /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("h3", { className: "text-lg", children: [
                        car.brand,
                        " ",
                        car.model
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: car.category })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 text-xs rounded", children: "Active" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Start:" }),
                      /* @__PURE__ */ jsx("span", { children: rental.startDate })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Duration:" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        rental.days,
                        " days"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                      /* @__PURE__ */ jsx(DollarSign, { className: "w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Total:" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-primary", children: [
                        "$",
                        rental.totalPrice
                      ] })
                    ] })
                  ] })
                ] })
              ]
            },
            rental.id
          );
        }) })
      ] }),
      rentals.filter((r) => r.status === "completed").length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl mb-4", children: "Rental History" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: rentals.filter((r) => r.status === "completed").map((rental) => {
          const car = cars.find((c) => c.id === rental.carId);
          if (!car) return null;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden",
              children: [
                /* @__PURE__ */ jsx("div", { className: "h-40 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden", children: car.image ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: car.image,
                    alt: `${car.brand} ${car.model}`,
                    className: "w-full h-full object-cover"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "text-5xl opacity-20", children: "\u{1F697}" }) }),
                /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("h3", { className: "text-lg", children: [
                        car.brand,
                        " ",
                        car.model
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: car.category })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 text-xs rounded", children: "Completed" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Period:" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        rental.startDate,
                        " - ",
                        rental.endDate
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                      /* @__PURE__ */ jsx(DollarSign, { className: "w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Total:" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "$",
                        rental.totalPrice
                      ] })
                    ] })
                  ] })
                ] })
              ]
            },
            rental.id
          );
        }) })
      ] })
    ] })
  ] });
}
export {
  MyRentals as default
};
