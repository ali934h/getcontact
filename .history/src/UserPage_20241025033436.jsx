// src/UserPage.jsx
import { useState } from "react";

function UserPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendData = async () => {
    setLoading(true);
    setResponseMessage("");
    try {
      const response = await fetch("https://getcontactworker.kenconsidine90.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          message,
        }),
      });
      if (response.ok) {
        setResponseMessage("اطلاعات با موفقیت ارسال شد!");
      } else {
        setResponseMessage("خطا در ارسال اطلاعات");
      }
    } catch (error) {
      setResponseMessage("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">صفحه کاربر</h1>

      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="نام" className="border p-2 rounded mb-4 w-full" />

      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="نام خانوادگی" className="border p-2 rounded mb-4 w-full" />

      <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="شماره موبایل" className="border p-2 rounded mb-4 w-full" />

      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ایمیل" className="border p-2 rounded mb-4 w-full" />

      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="پیام" className="border p-2 rounded mb-4 w-full" />

      <button onClick={sendData} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={loading}>
        {loading ? "در حال ارسال..." : "ارسال اطلاعات"}
      </button>

      {responseMessage && <p className="mt-4">{responseMessage}</p>}
    </div>
  );
}

export default UserPage;
