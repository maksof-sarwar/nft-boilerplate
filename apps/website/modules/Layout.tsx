import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { AppProps } from 'next/app';
import React, { useState } from 'react';
import '../styles/layout.module.css';
const { Header, Sider, Content } = Layout;

const PageLayout = ({ appProps }) => {
  const { Component, pageProps } = appProps;
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
          }}
        >
          <Component {...pageProps} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
