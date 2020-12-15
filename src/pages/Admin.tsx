import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { Access, useAccess } from 'umi';

export default (): React.ReactNode => {
  const access = useAccess();
  if (access.index_item) {
    // 只有拥有 index_item 权限的用户才能执行这里的逻辑
    console.log(access.index_item);
  }

  return (
    <PageContainer>
      <Card>
        <Alert
          message="umi ui 现已发布，欢迎使用 npm run ui 启动体验。"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
      </Card>
      <Access accessible={access.index_item} fallback={<div>您没有权限看到这些内容</div>}>
        拥有指定权限的用户才能看到这条内容
      </Access>
    </PageContainer>
  );
};
