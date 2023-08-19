import './App.css';
import Login from './component/Login/login';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Home from './component/Home/home';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#8c8c8c',
          borderRadius: 2,

          // Alias Token
          colorBgContainer: '#f6ffed',
        },
      }}
    >
      <Routes>
        <Route path="/home/*" element={<Home />}></Route>
        <Route exact path="/" element={<Login />}></Route>
      </Routes>
    </ConfigProvider>

  );
}

export default App;
