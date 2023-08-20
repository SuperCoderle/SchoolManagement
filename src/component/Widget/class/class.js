import React, { useEffect, useState } from 'react';
import customAxios from '../../../lib/axios';
import { Table, Button } from 'antd';
import { theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { ReloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

const Class = () => {
    const [classes, setClasses] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        await customAxios.get("classes").then(
            (res) => {
                setTimeout(() => {
                    setLoading(false);
                    setClasses(res.data);
                }, 600);
            }
        );
        await customAxios.get("lecturers").then(
            (res) => {
                setTimeout(() => {
                    setLoading(false);
                    setLecturers(res.data);
                }, 600);
            }
        );
        await customAxios.get("students").then(
            (res) => {
                setTimeout(() => {
                    setLoading(false);
                    setStudents(res.data);
                }, 600);
            }
        );
    }

    const reload = () => {
        setClasses([]);
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
                            dataIndex: 'idclass',
                            key: 'idclass'
                        },
                        {
                            title: 'Tên lớp',
                            dataIndex: 'name',
                            key: 'name'
                        },
                        {
                            title: 'Giảng viên chủ nhiệm',
                            dataIndex: '',
                            key: 'idlecturer',
                            render: (record) => (
                                <span>{lecturers && lecturers.length > 0 ? lecturers.find(x => x.idlecturer === record.idlecturer).name : null}</span>
                            ),
                        },
                        {
                            title: 'Sĩ số',
                            dataIndex: '',
                            key: 'numberOfStudents',
                            render: (record) => (
                                <span>{students.filter(x => x.idclass === record.idclass).length}</span>
                            )
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
                dataSource={classes} size='middle' rowKey={(item) => item.idlecturer} loading={loading} />
        </>
    )
}

export default Class
