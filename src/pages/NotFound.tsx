import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout showSearch={false}>
      <div className="min-h-[70vh] flex flex-col items-center justify-center animate-fade-in">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm max-w-md mx-auto">
          <h1 className="text-8xl font-bold text-primary mb-4">۴۰۴</h1>
          <p className="text-xl text-gray-600 mb-6">صفحه مورد نظر یافت نشد</p>
          <p className="text-gray-500 mb-8">
            متاسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
          </p>
          <Link to="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 inline-block">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
