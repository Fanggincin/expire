import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
// 1. 根據講義，引入 IconContext 核心與想要的 Bootstrap 圖標 [cite: 462, 567]
import { IconContext } from "react-icons";
import { BsPerson, BsEnvelope, BsLock } from "react-icons/bs";

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: '', type: '' });

  // Formik 手動驗證邏輯
  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = '欄位不可空白';
    } else if (values.username.length > 15) {
      errors.username = '不可超過 15 個字';
    }

    if (!values.email) {
      errors.email = '欄位不可空白';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email 格式不正確';
    }

    if (!values.password) {
      errors.password = '欄位不可空白';
    } else if (values.password.length < 6) {
      errors.password = '密碼最少需要 6 個字';
    } else if (values.password.length > 24) {
      errors.password = '密碼長度不能超過 24 個字';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password
          })
        });
        const data = await response.json();

        if (!response.ok) {
          setMessage({ text: data.message, type: 'error' });
        } else {
          setMessage({ text: '🎉 註冊成功！', type: 'success' });
          resetForm();
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (err) {
        setMessage({ text: '❌ 無法連線至後端伺服器', type: 'error' });
      }
    },
  });

  return (
    // 2. 使用 IconContext.Provider 統一設定圖標的外觀樣式（顏色與大小）[cite: 569, 570]
    <IconContext.Provider value={{ color: '#4A5F73', size: '18px' }}>
      <div style={{ padding: '60px 20px', display: 'flex', justifyContent: 'center', backgroundColor: '#F0F4F8' }}>
        <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '380px', padding: '35px', borderRadius: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
          <h3 style={{ color: '#4A5F73', fontSize: '24px', marginBottom: '25px', textAlign: 'center' }}>建立新帳號 🌱</h3>
          
          {message.text && (
            <div style={{ color: message.type === 'error' ? '#D97706' : '#15803D', backgroundColor: message.type === 'error' ? '#FEF3C7' : '#DCFCE7', padding: '12px', borderRadius: '14px', fontSize: '14px', marginBottom: '15px', fontWeight: 'bold' }}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* ========== 使用者名稱欄位 ========== */}
            <div>
              {/* 3. 在 Label 內直接以 Component 形式置入 <BsPerson /> 圖標 [cite: 529] */}
              <label htmlFor="username" style={{ color: '#4A5F73', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BsPerson /> 使用者名稱 
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder="怎麼稱呼您呢"
                style={{ width: '100%', padding: '12px', marginTop: '5px', border: '2px solid #E2E8F0', borderRadius: '14px', boxSizing: 'border-box' }}
              />
              {formik.touched.username && formik.errors.username ? (
                <div style={{ color: '#D97706', fontSize: '12px', marginTop: '5px', paddingLeft: '5px', fontWeight: 'bold' }}>{formik.errors.username}</div>
              ) : null}
            </div>

            {/* ========== 電子郵件欄位 ========== */}
            <div>
              {/* 置入 <BsEnvelope /> 電子郵件圖標 [cite: 529] */}
              <label htmlFor="email" style={{ color: '#4A5F73', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BsEnvelope /> 電子郵件 
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="example@mail.com"
                style={{ width: '100%', padding: '12px', marginTop: '5px', border: '2px solid #E2E8F0', borderRadius: '14px', boxSizing: 'border-box' }}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: '#D97706', fontSize: '12px', marginTop: '5px', paddingLeft: '5px', fontWeight: 'bold' }}>{formik.errors.email}</div>
              ) : null}
            </div>

            {/* ========== 密碼欄位 ========== */}
            <div>
              {/* 置入 <BsLock /> 密碼鎖頭圖標 [cite: 529] */}
              <label htmlFor="password" style={{ color: '#4A5F73', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BsLock /> 密碼 
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="請設定密碼"
                style={{ width: '100%', padding: '12px', marginTop: '5px', border: '2px solid #E2E8F0', borderRadius: '14px', boxSizing: 'border-box' }}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: '#D97706', fontSize: '12px', marginTop: '5px', paddingLeft: '5px', fontWeight: 'bold' }}>{formik.errors.password}</div>
              ) : null}
            </div>

            <button type="submit" style={{ backgroundColor: '#4A5F73', color: 'white', border: 'none', padding: '12px', borderRadius: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>確認註冊</button>
          </form>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Register;