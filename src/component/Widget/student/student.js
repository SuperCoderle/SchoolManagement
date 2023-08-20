import React, { useEffect, useRef, useState } from 'react';
import customAxios from '../../../lib/axios';
import { Table, Button, Tag, Modal, Form, Input, Select, DatePicker, Row, Col, theme, message, Popconfirm, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { ReloadOutlined, EditOutlined, DeleteOutlined, PlusSquareOutlined, SearchOutlined } from '@ant-design/icons'
import { FormItemLayout } from '../../../model/form/form-layout';
import dayjs from 'dayjs';

const Student = () => {
    const [students, setStudents] = useState([]);
    const [majors, setMajors] = useState([]);
    const [classes, setClasses] = useState([]);
    const [id, setId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("Tạo sinh viên mới");
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const { Option } = Select;
    const formItemLayout = FormItemLayout;
    const [form] = Form.useForm();
    const searchInput = useRef(null);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        await customAxios.get("students").then(
            (res) => {
                setTimeout(() => {
                    setLoading(false);
                    setStudents(res.data);
                }, 600);
            }
        );
        await customAxios.get("majors").then(
            (res) => {
                setTimeout(() => {
                    setLoading(false);
                    setMajors(res.data);
                }, 600);
            }
        );
        await customAxios.get("classes").then(
            (res) => {
                setTimeout(() => {
                    setLoading(false);
                    setClasses(res.data);
                }, 600);
            }
        );
    }

    const reload = () => {
        setStudents([]);
        loadData();
    }

    const openCreate = () => {
        setOpen(true);
        setTitle("Tạo sinh viên mới");
        setId(0);
        reset();
    };

    const openEdit = (id) => {
        setOpen(true);
        setTitle("Cập nhật thông tin sinh viên");
        const student = students.find(x => x.idstudent === id);
        if (student) {
            setId(student.idstudent);
            form.setFieldsValue({
                name: student.name,
                birthday: dayjs(student.birthday),
                gender: student.gender,
                phone: student.phone,
                idmajors: student.idmajors,
                idclass: student.idclass,
            })
        }
    };

    const reset = () => {
        form.resetFields();
    }

    const submit = async () => {
        try {
            const values = await form.validateFields();
            const data = {
                idstudent: 0,
                name: values.name,
                birthday: values.birthday.$d,
                gender: values.gender,
                phone: values.phone,
                avatar: values.avatar ? values.avatar : null,
                idmajors: values.idmajors ? values.idmajors : null,
                idclass: values.idclass ? values.idmajors : null
            }

            const hide = messageApi.loading("Đang xử lý...", 0);
            await customAxios.post("students", data).then(
                () => {
                    setTimeout(() => {
                        hide();
                        messageApi.success("Tạo sinh viên thành công.", 2);
                        reset();
                        loadData();
                    }, 600);
                }
            )
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const update = async () => {
        try {
            const values = await form.validateFields();
            const data = {
                idstudent: id,
                name: values.name,
                birthday: values.birthday.$d,
                gender: values.gender,
                phone: values.phone,
                avatar: values.avatar ? values.avatar : "asd",
                idmajors: values.idmajors ? values.idmajors : null,
                idclass: values.idclass ? values.idmajors : null
            }

            const hide = messageApi.loading("Đang xử lý...", 0);
            await customAxios.put(`students/${id}`, data).then(
                () => {
                    setTimeout(() => {
                        hide();
                        messageApi.success("Cập nhật sinh viên thành công.", 2);
                        loadData();
                    }, 600);
                }
            )
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const remove = async (id) => {
        const hide = messageApi.loading("Đang xử lý...", 0);
        await customAxios.delete(`students/${id}`).then(
            () => {
                setTimeout(() => {
                    hide();
                    messageApi.success("Xóa sinh viên thành công.", 2);
                    loadData();
                }, 600);
            }
        )
    };

    const handleSearch = (confirm) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(confirm)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        }
    });

    return (
        <>
            {contextHolder}

            <Header
                style={{
                    background: colorBgContainer,
                    padding: 0
                }}
            >
                <h4>Sinh viên</h4>
            </Header>

            <div style={{ marginBottom: 16 }}>
                <Button className='me-1' type="primary" icon={<ReloadOutlined />} disabled={loading} onClick={reload}>
                    Tải lại
                </Button>

                <Button type="primary" style={{ backgroundColor: "#4096ff" }} icon={<PlusSquareOutlined />} onClick={openCreate}>
                    Tạo mới
                </Button>
            </div>

            <Table
                columns={
                    [
                        {
                            title: '#',
                            dataIndex: 'idstudent',
                            key: 'idstudent',
                        },
                        {
                            title: 'Tên sinh viên',
                            dataIndex: 'name',
                            key: 'name',
                            ...getColumnSearchProps('name'),
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
                            title: 'Khoa',
                            dataIndex: 'idmajors',
                            key: 'idmajors',
                            render: (record) => (
                                <Tag color='gold'>{majors && majors.length > 0 ? majors.find(x => x.idmajors === record).name : null}</Tag>
                            )
                        },
                        {
                            title: 'Lớp',
                            dataIndex: 'idclass',
                            key: 'idclass',
                            render: (record) => (
                                <Tag color='geekblue'>{classes && classes.length > 0 ? classes.find(x => x.idclass === record).name : null}</Tag>
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
                                        onClick={() => openEdit(item.idstudent)}
                                        type='primary'
                                        icon={<EditOutlined />}
                                        style={{ backgroundColor: '#fa541c' }}
                                    >
                                        Sửa
                                    </Button>
                                    <Popconfirm
                                        title="Xóa sinh viên"
                                        description={`Bạn có muốn xóa ${item.name}`}
                                        onConfirm={() => remove(item.idstudent)}
                                        placement='left'
                                    >
                                        <Button
                                            type='primary'
                                            icon={<DeleteOutlined />}
                                            style={{ backgroundColor: '#434343' }}
                                        >
                                            Xóa
                                        </Button>
                                    </Popconfirm>
                                </div>
                            ),
                        },
                    ]
                }
                dataSource={students} rowKey={(item) => item.idstudent} size='small' loading={loading} />

            <Modal
                title={title}
                open={open}
                onOk={id === 0 ? submit : update}
                okButtonProps={{
                    disabled: false,
                }}
                cancelButtonProps={{ style: { display: "none" } }}
                onCancel={() => setOpen(false)}
                okText={id === 0 ? "Xác nhận tạo mới" : "Lưu thay đổi"}
                closeIcon={null}
                style={{ top: 50 }}
                width={940}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    style={{
                        marginTop: "3rem"
                    }}
                    scrollToFirstError
                >
                    <Row gutter={[16, 2]}>
                        {
                            id === 0 ?
                                (
                                    <>
                                        <Col span={12}>
                                            <Form.Item
                                                name="username"
                                                label="Tên đăng nhập"
                                                rules={[{ required: true, message: 'Vui lòng điền tên đăng nhập!' }]}
                                            >
                                                <Input placeholder="Tên đăng nhập" />
                                            </Form.Item></Col>
                                        <Col span={12}> <Form.Item
                                            name="password"
                                            label="Mật khẩu"
                                            rules={[{ required: true, nmessage: 'Vui lòng điền mật khẩu!' }]}
                                            hasFeedback
                                        >
                                            <Input.Password placeholder='Mật khẩu' />
                                        </Form.Item></Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="confirm"
                                                label="Xác nhận mật khẩu"
                                                dependencies={['password']}
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập lại mật khẩu!',
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('password') === value) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password placeholder='Nhập lại mật khẩu' />
                                            </Form.Item>
                                        </Col>
                                    </>
                                )
                                :
                                null
                        }

                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Tên sinh viên"
                                rules={[{ required: true, message: 'Vui lòng điền tên!' }]}
                            >
                                <Input placeholder='Tên sinh viên' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="birthday"
                                label="Ngày sinh"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                            >
                                <DatePicker placeholder='Ngày sinh' className='w-100' format={"DD-MM-YYYY"} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="Giới tính"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                            >
                                <Select placeholder="Chọn giới tính">
                                    <Option value="Name">Nam</Option>
                                    <Option value="Nữ">Nữ</Option>
                                    <Option value="Khác">Khác</Option>
                                </Select>
                            </Form.Item></Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Vui lòng điền số điện thoại!' }]}
                            >
                                <Input placeholder='Số điện thoại' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="idmajors"
                                label="Khoa"
                            >
                                <Select placeholder="Chọn khoa">
                                    {
                                        majors && majors.length > 0 ?
                                            majors.map((item) => {
                                                return (
                                                    <Option key={item.idmajors} value={item.idmajors}>{item.name}</Option>
                                                )
                                            })
                                            :
                                            null
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="avatar"
                                label="Avatar"
                            >
                                <Input type='file' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="idclass"
                                label="Lớp"
                            >
                                <Select placeholder="Chọn lớp">
                                    {
                                        classes && classes.length > 0 ?
                                            classes.map((item) => {
                                                return (
                                                    <Option key={item.idclass} value={item.idclass}>{item.name}</Option>
                                                )
                                            })
                                            :
                                            null
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default Student