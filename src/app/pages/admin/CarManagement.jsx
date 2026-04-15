import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DataStore } from "../../data/store";
import { Plus, Edit, Trash2, Search, X, Upload, Image as ImageIcon } from "lucide-react";
function CarManagement() {
  const [cars, setCars] = useState(DataStore.getCars());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    pricePerDay: "",
    year: "",
    category: "",
    status: "available",
    image: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || car.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  const openModal = (car) => {
    if (car) {
      setEditingCar(car);
      setFormData({
        brand: car.brand,
        model: car.model,
        pricePerDay: String(car.pricePerDay),
        year: String(car.year || ""),
        category: car.category || "",
        status: car.status,
        image: car.image || ""
      });
      setImagePreview(car.image || "");
    } else {
      setEditingCar(null);
      setFormData({
        brand: "",
        model: "",
        pricePerDay: "",
        year: "",
        category: "",
        status: "available",
        image: ""
      });
      setImagePreview("");
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCar(null);
    setImagePreview("");
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({ ...formData, image: base64String });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCar) {
      DataStore.updateCar(editingCar.id, {
        brand: formData.brand,
        model: formData.model,
        pricePerDay: Number(formData.pricePerDay),
        year: Number(formData.year),
        category: formData.category,
        status: formData.status,
        image: formData.image
      });
    } else {
      DataStore.addCar({
        brand: formData.brand,
        model: formData.model,
        pricePerDay: Number(formData.pricePerDay),
        year: Number(formData.year),
        category: formData.category,
        status: formData.status,
        image: formData.image
      });
    }
    setCars(DataStore.getCars());
    closeModal();
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this car?")) {
      DataStore.deleteCar(id);
      setCars(DataStore.getCars());
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl text-foreground mb-2", children: "Car Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage your car inventory" })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => openModal(),
          className: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all shadow-md",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
            "Add Car"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-card border border-border rounded-xl p-4 mb-6 shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search by brand or model...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "w-full pl-10 pr-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          className: "px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
          children: [
            /* @__PURE__ */ jsx("option", { value: "all", children: "All Status" }),
            /* @__PURE__ */ jsx("option", { value: "available", children: "Available" }),
            /* @__PURE__ */ jsx("option", { value: "rented", children: "Rented" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-card border border-border rounded-xl shadow-md overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-muted", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Image" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Car ID" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Brand" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Model" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Year" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Category" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Price/Day" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: filteredCars.map((car) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden bg-accent border border-border", children: car.image ? /* @__PURE__ */ jsx(
          "img",
          {
            src: car.image,
            alt: `${car.brand} ${car.model}`,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-2xl opacity-30", children: "\u{1F697}" }) }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-muted-foreground", children: car.id }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: car.brand }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: car.model }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: car.year }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: car.category }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-sm", children: [
          "$",
          car.pricePerDay
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `px-2 py-1 rounded text-xs ${car.status === "available" ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"}`,
            children: car.status
          }
        ) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openModal(car),
              className: "p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors",
              "aria-label": "Edit",
              children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDelete(car.id),
              className: "p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors",
              "aria-label": "Delete",
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }) })
      ] }, car.id)) })
    ] }) }) }),
    isModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl shadow-2xl w-full max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-border", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl", children: editingCar ? "Edit Car" : "Add New Car" }),
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
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Car Image" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs("label", { className: "flex-1 cursor-pointer", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 px-4 py-2 bg-input-background border border-input rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors", children: [
                /* @__PURE__ */ jsx(Upload, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Choose Image" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  onChange: handleImageChange,
                  className: "hidden"
                }
              )
            ] }) }),
            imagePreview && /* @__PURE__ */ jsxs("div", { className: "relative w-full h-48 bg-accent rounded-lg overflow-hidden border border-border", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: imagePreview,
                  alt: "Preview",
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setFormData({ ...formData, image: "" });
                    setImagePreview("");
                  },
                  className: "absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity shadow-md",
                  children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            !imagePreview && /* @__PURE__ */ jsx("div", { className: "w-full h-48 bg-accent rounded-lg border-2 border-dashed border-border flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx(ImageIcon, { className: "w-12 h-12 mx-auto mb-2 text-muted-foreground opacity-50" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No image uploaded" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Brand" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.brand,
              onChange: (e) => setFormData({ ...formData, brand: e.target.value }),
              className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Model" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.model,
              onChange: (e) => setFormData({ ...formData, model: e.target.value }),
              className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Year" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: formData.year,
                onChange: (e) => setFormData({ ...formData, year: e.target.value }),
                className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Price/Day" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: formData.pricePerDay,
                onChange: (e) => setFormData({ ...formData, pricePerDay: e.target.value }),
                className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Category" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.category,
              onChange: (e) => setFormData({ ...formData, category: e.target.value }),
              className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
              placeholder: "e.g., Sedan, SUV, Sports"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Status" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: formData.status,
              onChange: (e) => setFormData({ ...formData, status: e.target.value }),
              className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
              children: [
                /* @__PURE__ */ jsx("option", { value: "available", children: "Available" }),
                /* @__PURE__ */ jsx("option", { value: "rented", children: "Rented" })
              ]
            }
          )
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
              children: editingCar ? "Update" : "Add"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  CarManagement as default
};

