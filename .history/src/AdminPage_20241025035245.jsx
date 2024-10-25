// src/AdminPage.jsx
import { useState, useEffect } from "react";

function AdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // دریافت لیست کلیدها
      const response = await fetch(`https://getcontactworker.kenconsidine90.workers.dev/?key=all`);
      if (response.ok) {
        const keys = await response.json();
        const fetchedData = [];

        // دریافت داده‌ها براساس کلیدها
        for (const key of keys) {
          const keyResponse = await fetch(`https://getcontactworker.kenconsidine90.workers.dev/?key=${key}`);
          if (keyResponse.ok) {
            const result = await keyResponse.json();
            fetchedData.push(result);
          } else {
            setError("خطا در دریافت اطلاعات");
          }
        }

        setData(fetchedData);
      } else {
        setError("خطا در دریافت کلیدها");
      }
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
