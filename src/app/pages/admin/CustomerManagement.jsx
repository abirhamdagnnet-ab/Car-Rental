import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DataStore } from "../../data/store";
import { Plus, Edit, Trash2, Search, X } from "lucide-react";
function CustomerManagement() {
  const [customers, setCustomers] = useState(DataStore.getCustomers());
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    licenseNumber: ""
  });
  const filteredCustomers = customers.filter(
    (customer) => customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || customer.email.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone.includes(searchTerm)
  );
  const openModal = (customer) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        licenseNumber: customer.licenseNumber
      });
    } else {
      setEditingCustomer(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        licenseNumber: ""
      });
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      DataStore.updateCustomer(editingCustomer.id, formData);
    } else {
      DataStore.addCustomer(formData);
    }
    setCustomers(DataStore.getCustomers());
    closeModal();
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      DataStore.deleteCustomer(id);
      setCustomers(DataStore.getCustomers());
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl text-foreground mb-2", children: "Customer Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage customer information" })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => openModal(),
          className: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all shadow-md",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
            "Add Customer"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-card border border-border rounded-xl p-4 mb-6 shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search by name, email, or phone...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full pl-10 pr-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-card border border-border rounded-xl shadow-md overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-muted", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Customer ID" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Full Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Phone" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "License Number" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-sm", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: filteredCustomers.map((customer) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-muted-foreground", children: customer.id }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: customer.fullName }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: customer.email }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: customer.phone }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm", children: customer.licenseNumber }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openModal(customer),
              className: "p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors",
              "aria-label": "Edit",
              children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDelete(customer.id),
              className: "p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors",
              "aria-label": "Delete",
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }) })
      ] }, customer.id)) })
    ] }) }) }),
    isModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl shadow-2xl w-full max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-border", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl", children: editingCustomer ? "Edit Customer" : "Add New Customer" }),
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
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Full Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.fullName,
              onChange: (e) => setFormData({ ...formData, fullName: e.target.value }),
              className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: formData.email,
              onChange: (e) => setFormData({ ...formData, email: e.target.value }),
              className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "Phone" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              value: formData.phone,
              onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
              className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-2 text-sm", children: "License Number" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.licenseNumber,
              onChange: (e) => setFormData({ ...formData, licenseNumber: e.target.value }),
              className: "w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
              required: true
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
              children: editingCustomer ? "Update" : "Add"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  CustomerManagement as default
};

