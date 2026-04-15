import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DataStore } from "../../data/store";
import { Plus, CheckCircle, X } from "lucide-react";
function RentalManagement() {
  const [rentals, setRentals] = useState(DataStore.getRentals());
  const [cars] = useState(DataStore.getCars());
  const [customers] = useState(DataStore.getCustomers());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    carId: "",
    days: ""
  });
  const availableCars = cars.filter((c) => c.status === "available");
  const openModal = () => {
    setFormData({
      customerId: "",
      carId: "",
      days: ""
    });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const car = cars.find((c) => c.id === formData.carId);
    if (!car) return;
    const totalPrice = car.pricePerDay * Number(formData.days);
    DataStore.addRental({
      carId: formData.carId,
      customerId: formData.customerId,
      userId: "1",
      days: Number(formData.days),
      totalPrice,
      status: "active",
      startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    setRentals(DataStore.getRentals());
    closeModal();
  };
  const handleReturn = (rentalId) => {
    if (confirm("Mark this rental as completed?")) {
      DataStore.completeRental(rentalId);
      setRentals(DataStore.getRentals());
    }
  };
  const selectedCar = cars.find((c) => c.id === formData.carId);
  const calculatedTotal = selectedCar && formData.days ? selectedCar.pricePerDay * Number(formData.days) : 0;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl text-foreground mb-2", children: "Rental Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage car rentals and assignments" })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: openModal,
          className: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all shadow-md",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
            "Assign Rental"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl shadow-md overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "p-4 bg-muted border-b border-border", children: /* @__PURE__ */ jsx("h2", { className: "text-lg", children: "Active Rentals" }) }),
      /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
        /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-muted", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Rental ID" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Car" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Customer" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Days" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Total Price" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Start Date" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: rentals.filter((r) => r.status === "active").map((rental) => {
            const car = cars.find((c) => c.id === rental.carId);
            const customer = customers.find((c) => c.id === rental.customerId);
            return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-muted-foreground", children: rental.id }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: car ? `${car.brand} ${car.model}` : "N/A" }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: customer?.fullName || "N/A" }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: rental.days }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-sm", children: [
                "$",
                rental.totalPrice
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: rental.startDate }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 rounded text-xs", children: rental.status }) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleReturn(rental.id),
                  className: "flex items-center gap-1 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all",
                  children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4" }),
                    "Return Car"
                  ]
                }
              ) })
            ] }, rental.id);
          }) })
        ] }),
        rentals.filter((r) => r.status === "active").length === 0 && /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-muted-foreground", children: "No active rentals" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl shadow-md overflow-hidden mt-6", children: [
      /* @__PURE__ */ jsx("div", { className: "p-4 bg-muted border-b border-border", children: /* @__PURE__ */ jsx("h2", { className: "text-lg", children: "Completed Rentals" }) }),
      /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
        /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-muted", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Rental ID" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Car" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Customer" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Days" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Total Price" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Start Date" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "End Date" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: rentals.filter((r) => r.status === "completed").map((rental) => {
            const car = cars.find((c) => c.id === rental.carId);
            const customer = customers.find((c) => c.id === rental.customerId);
            return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-muted-foreground", children: rental.id }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: car ? `${car.brand} ${car.model}` : "N/A" }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: customer?.fullName || "N/A" }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: rental.days }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-sm", children: [
                "$",
                rental.totalPrice
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: rental.startDate }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: rental.endDate })
            ] }, rental.id);
          }) })
        ] }),
        rentals.filter((r) => r.status === "completed").length === 0 && /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-muted-foreground", children: "No completed rentals" })
      ] })
    ] }),
    isModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl shadow-2xl w-full max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-border", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl", children: "Assign New Rental" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: closeModal,
            className: "p-2 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded-lg transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Select Customer" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: formData.customerId,
              onChange: (e) => setFormData({ ...formData, customerId: e.target.value }),
              className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
              required: true,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Choose a customer" }),
                customers.map((customer) => /* @__PURE__ */ jsxs("option", { value: customer.id, children: [
                  customer.fullName,
                  " (",
                  customer.email,
                  ")"
                ] }, customer.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Select Car" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: formData.carId,
              onChange: (e) => setFormData({ ...formData, carId: e.target.value }),
              className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
              required: true,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Choose a car" }),
                availableCars.map((car) => /* @__PURE__ */ jsxs("option", { value: car.id, children: [
                  car.brand,
                  " ",
                  car.model,
                  " - $",
                  car.pricePerDay,
                  "/day"
                ] }, car.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Rental Days" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: "1",
              value: formData.days,
              onChange: (e) => setFormData({ ...formData, days: e.target.value }),
              className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
              required: true
            }
          )
        ] }),
        calculatedTotal > 0 && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-primary/10 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Total Price" }),
          /* @__PURE__ */ jsxs("p", { className: "text-2xl text-primary", children: [
            "$",
            calculatedTotal
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: closeModal,
              className: "flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-all",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all shadow-md",
              children: "Assign Rental"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  RentalManagement as default
};

