import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert } from 'antd';
import { useModel } from 'umi';

export default (): React.ReactNode => {
  const { initialState } = useModel('@@initialState');

  return (
    <PageContainer>
      <Card>
        <Alert
          message="当前系统已装载完成。"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        欢迎使用核桃编程 {initialState?.settings?.title}
      </Card>
    </PageContainer>
  );
};
