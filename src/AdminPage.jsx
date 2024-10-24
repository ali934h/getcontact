import { useState, useEffect } from "react";

function AdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // فرض کن تمام داده‌ها در یک آرایه کلیدها ذخیره شده‌اند
      const keys = ["user-12345", "user-67890"]; // این کلیدها باید داینامیک باشند
      const fetchedData = [];

      for (const key of keys) {
        const response = await fetch(`https://your-worker-url/?key=${key}`);
        if (response.ok) {
          const result = await response.json();
          fetchedData.push(result);
        } else {
          setError("خطا در دریافت اطلاعات");
        }
      }

      setData(fetchedData);
    } catch (err) {
      setError("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // بارگذاری داده‌ها در هنگام لود صفحه
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">صفحه مدیر</h1>
      {loading && <p>در حال بارگذاری...</p>}
      {error && <p className="text-red-500">خطا: {error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index} className="mb-4 p-4 bg-gray-100 rounded shadow">
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
