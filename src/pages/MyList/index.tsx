import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getMyList } from './service';
import { MyListType } from './data';

/** 使用ProTable示例组件 */
const Mylist = () => {
  // 列描述
  const columns: ProColumns<MyListType>[] = [
    {
      key: 'name', // React需要的key(有唯一的 dataIndex 则可省略不写)
      title: '姓名', // 列标题
      dataIndex: 'name', // 指定数据源中的字段
      align: 'center', // 对齐
      ellipsis: false, // 超过宽度是否省略
    },
    {
      // key: 'age',
      title: '年龄',
      dataIndex: 'age',
      // 渲染函数
      render(text, record, index) {
        // text 当前行数据中 age 字段的值
        // record 当前行数据
        // index 当前行索引
        return <div style={{ color: 'red' }}>{text}</div>;
      },
      search: false, // 是否加入搜索项
    },
  ];

  return (
    <PageContainer>
      <ProTable<MyListType>
        columns={columns}
        rowKey="uid"
        headerTitle="我的列表"
        // 分页器配置
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        // 如果实际接口入参出参的数据类型与 ProTable 规定的不一致需要自行处理
        request={async (params) => {
          console.log('🚀 ~ file: index.tsx ~ line 87 ~ request={ ~ params', params);
          // params 数据类型:
          // {
          //     pageSize?: number | undefined;
          //     current?: number | undefined;
          //     keyword?: string | undefined;
          // }

          // 处理接口实际入参
          const paramsReal = {
            pageNum: params.current,
            ...params,
          };
          const res = await getMyList({ ...paramsReal });
          console.log('🚀 ~ file: index.tsx ~ line 80 ~ request={ ~ res', res);
          // ProTable 规定响应数据格式:
          // {
          //     data: T[];
          //     success?: boolean;
          //     total?: number;
          //     [key: string]: any;
          // }

          // 处理接口实际出参
          return {
            data: res?.data?.list,
            success: res?.success,
            total: res?.data?.total,
          };
        }}
        // 操作栏
        toolBarRender={() => [
          <Button key="1" type="primary" onClick={() => console.log('add')}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default Mylist;
