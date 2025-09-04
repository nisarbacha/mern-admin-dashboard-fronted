import { BellOutlined } from '@ant-design/icons'
import { Avatar, Badge } from 'antd'
import React from 'react'

const Notifications = () => {
    return (
        <Badge count={5}  >
            <Avatar style={{ backgroundColor: 'white ', color: 'black', verticalAlign: 'middle' }} icon={<BellOutlined style={{ fontSize: '22px' }} />} size="default" />
        </Badge>
    )
}

export default Notifications