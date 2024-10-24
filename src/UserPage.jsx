import { useState } from "react";

function UserPage() {
  const [inputData, setInputData] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendData = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("https://your-worker-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputData }),
      });
      if (response.ok) {
        setMessage("اطلاعات با موفقیت ارسال شد!");
      } else {
        setMessage("خطا در ارسال اطلاعات");
      }
    } catch (error) {
      setMessage("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">صفحه کاربر</h1>
      <input type="text" value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder="اطلاعاتی وارد کنید" className="border p-2 rounded mb-4" />
      <button onClick={sendData} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={loading}>
        {loading ? "در حال ارسال..." : "ارسال اطلاعات"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default UserPage;
