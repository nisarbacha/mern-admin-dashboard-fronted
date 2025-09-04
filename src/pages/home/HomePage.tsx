import React from 'react'
import { useAuthStore } from '../../store'
import { Avatar, Card, Col, Image, List, Row, Statistic, Typography } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

const { Title } = Typography

const HomePage = () => {
  const { user } = useAuthStore()

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    }, {
      title: 'Ant Design Title 4',
    }, {
      title: 'Ant Design Title 4',
    },
  ];

  return (
    <>
      <Title level={5}>Welcome to {`${user?.firstName} ${user?.lastName}`}</Title>

      <Row gutter={16}>
        <Col span={18}>
          <Row gutter={12}>
            <Col span={8}>
              <Card hoverable variant="borderless">
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={8} >
              <Card hoverable variant="borderless">
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable variant="borderless">
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          <Image
            width={'90%'}
            preview={false}
            height={'80%'}
            src="https://intellspot.com/wp-content/uploads/2020/03/column-chart-examples.png"
            alt="Dashboard Image"
            style={{ borderRadius: '10px', marginTop: '20px' }} />
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <List
              header={<div>Recent Activities</div>}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item
                  className='recent-activity-item'
                // Optionally, you can add a className for more advanced hover effects via CSS
                >
                  <List.Item.Meta
                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>

  )
}

export default HomePage