import React, { useState } from 'react';
import './home.css';
import Dashboard from '../Widget/dashboard/dashboard';
import Student from '../Widget/student/student';
import Lecturer from '../Widget/lecturer/lecturer';
import Majors from '../Widget/majors/majors';
import Class from '../Widget/class/class';
import {
    DashboardOutlined,
    TeamOutlined,
    UserOutlined,
    BookOutlined,
    SolutionOutlined,
    AlertOutlined,
    MailOutlined,
    UserSwitchOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, theme, Input, Button } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Dashboard', 'dashboard', <DashboardOutlined />),
    getItem('Sinh viên', 'student', <TeamOutlined />),
    getItem('Giảng viên', 'lecturer', <UserOutlined />),
    getItem('Khoa', 'majors', <BookOutlined />),
    getItem('Lớp', 'class', <SolutionOutlined />)
];

const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onSearch = (value) => console.log(value);
    const navigate = useNavigate();

    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" defaultSelectedKeys={["dashboard"]} mode="inline" items={items}
                        onClick={({ key }) => {
                            navigate(key);
                        }}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <div className='d-flex justify-content-between align-items-center px-3'>
                            <div className="d-flex w-50">
                                <Search placeholder="input search text" onSearch={onSearch} enterButton />
                            </div>
                            <div>
                                <Button type="text" icon={<AlertOutlined />} size="middle" />
                                <Button type="text" icon={<MailOutlined />} size="middle" />
                                <Button type="text" icon={<UserSwitchOutlined />} size="middle" />
                            </div>
                        </div>
                    </Header>
                    <Content>
                        <Breadcrumb
                            className='px-3 py-1'
                            style={{
                                background: colorBgContainer,
                            }}
                            items={[
                                {
                                    href: '',
                                    title: <HomeOutlined />,
                                },
                                {
                                    href: '',
                                    title: (
                                        <>
                                            <UserOutlined />
                                            <span>Application List</span>
                                        </>
                                    ),
                                },
                                {
                                    title: 'Application',
                                },
                            ]}
                        >
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                        >
                            <MainContent />
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Team 2 ©2023 <a href="https://github.com/SuperCoderle">Created by SuperCoderle</a>
                    </Footer>
                </Layout>
            </Layout>


        </>
    )
}

export default Home;

function MainContent() {
    return (
        <Routes>
            <Route exact path="dashboard" element={<Dashboard />} />
            <Route exact path="student" element={<Student />} />
            <Route exact path="lecturer" element={<Lecturer />} />
            <Route exact path="majors" element={<Majors />} />
            <Route exact path="class" element={<Class />} />
        </Routes>
    )
}