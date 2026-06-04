import React, { useState, useEffect } from 'react';

function Dashboard() {
  const currentUserName = localStorage.getItem('current_session_user') || '使用者';
  
  // 💡 框架註記：這裡留給負責細節功能的同學儲存後端拿到的物品陣列
  const [items, setItems] = useState([
    // 這裡先留一筆可愛的莫蘭迪範例資料，方便同學看懂 RWD 樣式
    { id: 'demo', name: '範例鮮奶（請同學換成 API 資料）🥛', daysLeft: 2, date: '2026-06-04', color: '#F2C6C6' }
  ]);

  return (
    <div style={{ padding: '30px 20px', backgroundColor: '#F0F4F8', minHeight: '80vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#4A5F73', marginBottom: '20px' }}>🐻 歡迎回來，{currentUserName} ！</h2>
        
        {/* RWD 彈性版面佈局 */}
        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
          
          {/* 左區：物品展示清單區 */}
          <div style={{ flex: 1, minWidth: '320px', backgroundColor: '#ffffff', padding: '25px', borderRadius: '24px', boxShadow: '0 6px 18px rgba(0,0,0,0.02)' }}>
            <h3 style={{ color: '#4A5F73', marginBottom: '20px', fontSize: '20px' }}>🎀 我的物品清單</h3>

            {/* 👇👇👇 終點線：留下漂亮的團員接手註解 👇👇👇 */}
            {/* 💡 同學請注意：
                1. 請在這裡使用 useEffect 呼叫後端 API (GET http://localhost:5000/api/items) 拿到物品陣列。
                2. 呼叫時記得在網址帶上當前使用者的 Email 參數 (可從 localStorage.getItem('current_session_email') 取得)。
                3. 拿到資料後，用 items.map() 把下面這個可愛卡片元件渲染出來。
                4. 資料庫的物品格式為：{ name: '名稱', date: '日期', remindDays: '天數' }。
            */}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: item.color, borderRadius: '16px' }}>
                  <span style={{ fontWeight: 'bold', color: '#4A5F73' }}>{item.name}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ backgroundColor: '#ffffff', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', color: '#4A5F73' }}>
                      剩餘 {item.daysLeft} 天
                    </span>
                    <div style={{ fontSize: '11px', color: '#708090', marginTop: '3px' }}>到期日: {item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右區：新增物品表單區 */}
          <div style={{ width: '100%', maxWidth: '320px', backgroundColor: '#ffffff', padding: '25px', borderRadius: '24px', boxShadow: '0 6px 18px rgba(0,0,0,0.02)', height: 'fit-content' }}>
            <h3 style={{ color: '#4A5F73', marginBottom: '20px', fontSize: '20px' }}>➕ 新增物品</h3>
            
            {/* 💡 同學請注意：
                1. 請幫這個表單綁定 onSubmit 處理。
                2. 點擊「儲存物品」時發送 POST 連線到 http://localhost:5000/api/items。
                3. 傳送的 body 要包含：{ name, date, remindDays, userEmail }。
            */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="物品名稱" style={{ padding: '10px 14px', border: '2px solid #E2E8F0', borderRadius: '14px', width: '100%', boxSizing: 'border-box' }} />
              <input type="date" style={{ padding: '10px 14px', border: '2px solid #E2E8F0', borderRadius: '14px', width: '100%', boxSizing: 'border-box', color: '#708090' }} />
              <select style={{ padding: '10px 14px', border: '2px solid #E2E8F0', borderRadius: '14px', width: '100%', boxSizing: 'border-box', color: '#708090' }}>
                <option value="1">1 天前提醒</option>
                <option value="3">3 天前提醒</option>
                <option value="7">7 天前提醒</option>
              </select>
              <button type="button" style={{ backgroundColor: '#D2DFE6', color: '#4A5F73', border: 'none', padding: '10px', borderRadius: '14px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>📷 上傳照片</button>
              <button type="button" style={{ backgroundColor: '#A3B8CC', color: 'white', border: 'none', padding: '12px', borderRadius: '14px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', marginTop: '5px' }}>儲存物品</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;