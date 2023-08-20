import React, { useEffect, useState } from 'react';
import customAxios from '../../../lib/axios';
import { Table, Button } from 'antd';
import { theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { ReloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';

const Lecturer = () => {
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        await customAxios.get("lecturers").then(
            (res) => {
                setTimeout(() => {
                    setLoading(false);
                    setLecturers(res.data);
                }, 600);
            }
        )
    }

    const reload = () => {
        setLecturers([]);
        loadData();
    }

    return (
        <>
            <Header
                style={{
                    background: colorBgContainer,
                    padding: 0
                }}
            >
                <h4>Sinh viên</h4>
            </Header>

            <div style={{ marginBottom: 16 }}>
                <Button type="primary" icon={<ReloadOutlined />} disabled={loading} onClick={reload}>
                    Reload
                </Button>
            </div>
            <Table
                columns={
                    [
                        {
                            title: '#',
                            dataIndex: 'idlecturer',
                            key: 'idlecturer'
                        },
                        {
                            title: 'Tên giảng viên',
                            dataIndex: 'name',
                            key: 'name'
                        },
                        {
                            title: 'Ngày sinh',
                            dataIndex: 'birthday',
                            key: 'birthday',
                            render: ((date) => dayjs(date).format("DD-MM-YYYY"))
                        },
                        {
                            title: 'Giới tính',
                            dataIndex: 'gender',
                            key: 'gender'
                        },
                        {
                            title: 'SĐT',
                            dataIndex: 'phone',
                            key: 'phone'
                        },
                        {
                            title: 'Avatar',
                            dataIndex: 'avatar',
                            key: 'avatar'
                        },
                        {
                            title: 'Action',
                            dataIndex: '',
                            key: 'x',
                            width: 180,
                            render: (item) => (
                                <div className='d-flex justify-content-between'>
                                    <Button
                                        onClick={() => console.log(item)}
                                        type='primary'
                                        icon={<EditOutlined />}
                                        style={{ backgroundColor: '#fa541c' }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        onClick={() => console.log(item)}
                                        type='primary'
                                        icon={<DeleteOutlined />}
                                        style={{ backgroundColor: '#434343' }}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            ),
                        },
                    ]
                }
                dataSource={lecturers} size='middle' rowKey={(item) => item.idlecturer} loading={loading} />
        </>
    )
}

export default Lecturer