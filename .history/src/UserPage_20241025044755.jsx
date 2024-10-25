import { useState } from "react";

function UserPage() {
  const [inputData, setInputData] = useState({ name: "", lastName: "", phone: "", email: "", message: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  // این تابع زمانی فراخوانی می‌شود که کاربر کپچا را حل می‌کند
  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const sendData = async () => {
    setLoading(true);
    setMessage("");
    try {
      // بررسی اینکه کاربر کپچا را حل کرده باشد
      if (!captchaToken) {
        setMessage("6LcocWsqAAAAAE_nodEl5RwWqx-_A6cxfJj0fT5A");
        setLoading(false);
        return;
      }

      const response = await fetch("https://getcontactworker.kenconsidine90.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputData, captchaToken }), // ارسال token کپچا همراه با داده‌ها
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

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">صفحه کاربر</h1>
      <input type="text" name="name" value={inputData.name} onChange={handleChange} placeholder="نام" className="border p-2 rounded mb-4" />
      <input type="text" name="lastName" value={inputData.lastName} onChange={handleChange} placeholder="نام خانوادگی" className="border p-2 rounded mb-4" />
      <input type="text" name="phone" value={inputData.phone} onChange={handleChange} placeholder="شماره موبایل" className="border p-2 rounded mb-4" />
      <input type="email" name="email" value={inputData.email} onChange={handleChange} placeholder="ایمیل" className="border p-2 rounded mb-4" />
      <textarea name="message" value={inputData.message} onChange={handleChange} placeholder="پیام" className="border p-2 rounded mb-4"></textarea>

      {/* کپچا */}
      <div className="mb-4">
        <div
          className="g-recaptcha"
          data-sitekey="YOUR_RECAPTCHA_SITE_KEY" // کلید سایت reCAPTCHA خود را اینجا قرار دهید
          data-callback={onCaptchaChange} // وقتی کپچا تایید شد، این تابع فراخوانی می‌شود
        ></div>
      </div>

      <button onClick={sendData} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={loading}>
        {loading ? "در حال ارسال..." : "ارسال اطلاعات"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default UserPage;
