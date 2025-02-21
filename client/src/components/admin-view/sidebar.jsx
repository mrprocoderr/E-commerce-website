
"use client";

import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { motion } from "framer-motion";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-6 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem, index) => (
        <motion.div
          key={menuItem.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-all duration-200"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </motion.div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Sidebar Drawer for Mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-white shadow-lg">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-3 mt-5 mb-5">
                <motion.div
                  initial={{ rotate: -20 }}
                  animate={{ rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <ChartNoAxesCombined size={30} className="text-gray-700" />
                </motion.div>
                <h1 className="text-2xl font-extrabold text-gray-800">
                  Admin Panel
                </h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Sidebar for Large Screens */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden w-64 flex-col border-r bg-gray-50 p-6 lg:flex shadow-md"
      >
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-3"
        >
          <motion.div
            initial={{ rotate: -20 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <ChartNoAxesCombined size={30} className="text-gray-700" />
          </motion.div>
          <h1 className="text-2xl font-extrabold text-gray-800">Admin Panel</h1>
        </div>
        <MenuItems />
      </motion.aside>
    </Fragment>
  );
}

export default AdminSideBar;
