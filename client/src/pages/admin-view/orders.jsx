import AdminOrdersView from "@/components/admin-view/orders";
import { motion } from "framer-motion";

function AdminOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="p-5 bg-white shadow-md rounded-lg"
    >
      <AdminOrdersView />
    </motion.div>
  );
}

export default AdminOrders;
