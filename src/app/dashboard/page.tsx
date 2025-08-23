import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import Dashboard from "@/components/dashbord/dashboard";

const DashboardLayout = async () => {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // لو مش عامل لوجين → يتوجه للوجين
  }

  return (
    <Dashboard />
  );
};

export default DashboardLayout;