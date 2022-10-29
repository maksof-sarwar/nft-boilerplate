import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import '../styles/layout.module.scss';
const { Content } = Layout;

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
