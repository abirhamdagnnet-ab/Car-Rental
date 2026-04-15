import { jsx, jsxs } from "react/jsx-runtime";
import { DataStore } from "../../data/store";
import { Download, FileText } from "lucide-react";
function Reports() {
  const cars = DataStore.getCars();
  const rentals = DataStore.getRentals();
  const customers = DataStore.getCustomers();
  const handleExportCSV = (type) => {
    let csvContent = "";
    let filename = "";
    if (type === "cars") {
      csvContent = "ID,Brand,Model,Year,Category,Price Per Day,Status\n";
      cars.forEach((car) => {
        csvContent += `${car.id},${car.brand},${car.model},${car.year},${car.category},${car.pricePerDay},${car.status}
`;
      });
      filename = "cars-report.csv";
    } else if (type === "rentals") {
      csvContent = "ID,Car,Customer,Days,Total Price,Start Date,Status\n";
      rentals.forEach((rental) => {
        const car = cars.find((c) => c.id === rental.carId);
        const customer = customers.find((c) => c.id === rental.customerId);
        csvContent += `${rental.id},"${car?.brand} ${car?.model}",${customer?.fullName},${rental.days},${rental.totalPrice},${rental.startDate},${rental.status}
`;
      });
      filename = "rentals-report.csv";
    }
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const handleExportPDF = (type) => {
    alert(`PDF export for ${type} would be generated using a library like jsPDF in production.`);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl text-foreground mb-2", children: "Reports" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Generate and export system reports" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl", children: "Cars Report" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "All cars in inventory" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 bg-muted rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Total Cars" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: cars.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 bg-muted rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Available" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: cars.filter((c) => c.status === "available").length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 bg-muted rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Rented" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: cars.filter((c) => c.status === "rented").length })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleExportPDF("cars"),
              className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-all",
              children: [
                /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
                "Export PDF"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleExportCSV("cars"),
              className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all",
              children: [
                /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
                "Export CSV"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl", children: "Rentals Report" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "All rental transactions" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 bg-muted rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Total Rentals" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: rentals.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 bg-muted rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Active" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: rentals.filter((r) => r.status === "active").length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 bg-muted rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Completed" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: rentals.filter((r) => r.status === "completed").length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-3 bg-muted rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Total Revenue" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
              "$",
              rentals.reduce((sum, r) => sum + r.totalPrice, 0)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleExportPDF("rentals"),
              className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-all",
              children: [
                /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
                "Export PDF"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleExportCSV("rentals"),
              className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all",
              children: [
                /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
                "Export CSV"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-card border border-border rounded-xl p-6 shadow-md", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl mb-4", children: "Cars Inventory Preview" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-muted", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "ID" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Brand" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Model" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Year" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Category" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Price/Day" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: cars.slice(0, 5).map((car) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-cyan-50 dark:hover:bg-cyan-900/20", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: car.id }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: car.brand }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: car.model }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: car.year }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: car.category }),
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-2", children: [
            "$",
            car.pricePerDay
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded text-xs ${car.status === "available" ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"}`, children: car.status }) })
        ] }, car.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-card border border-border rounded-xl p-6 shadow-md", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl mb-4", children: "Rentals History Preview" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-muted", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "ID" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Car" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Customer" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Days" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Total" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Start Date" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: rentals.slice(0, 5).map((rental) => {
          const car = cars.find((c) => c.id === rental.carId);
          const customer = customers.find((c) => c.id === rental.customerId);
          return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-cyan-50 dark:hover:bg-cyan-900/20", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: rental.id }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: car ? `${car.brand} ${car.model}` : "N/A" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: customer?.fullName || "N/A" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: rental.days }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-2", children: [
              "$",
              rental.totalPrice
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: rental.startDate }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded text-xs ${rental.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"}`, children: rental.status }) })
          ] }, rental.id);
        }) })
      ] }) })
    ] })
  ] });
}
export {
  Reports as default
};

