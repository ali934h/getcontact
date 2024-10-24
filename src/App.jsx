import { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // فرض کن این URL یک API بک‌اند است که اطلاعات را برمی‌گرداند
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      if (!response.ok) {
        throw new Error("مشکلی در دریافت اطلاعات رخ داد");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">دریافت اطلاعات از بک‌اند</h1>
      <button onClick={fetchData} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        دریافت اطلاعات
      </button>

      {loading && <p>در حال بارگذاری...</p>}
      {error && <p className="text-red-500">خطا: {error}</p>}
      {data && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{data.title}</h2>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
}

export default App;
