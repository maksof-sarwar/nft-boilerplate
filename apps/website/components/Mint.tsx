import React from 'react';
import { truncate } from '../utils/ethereum';
import { Alert, Button, Col, Modal, Row, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks/useReducer';
import {
  connect,
  detectAccount,
  signInToWallet,
} from '../redux/blockchain/blockchainAction';
import { fetchData } from '../redux/data/dataActions';
import { RootState } from '../redux/store';

import { useEffect } from 'react';
import { updateSignerToken } from '@armorsclub/apps/website/redux/blockchain/blockChain.slice';

function Mint() {
  const [modal, contextHolder] = Modal.useModal();
  const data = useAppSelector((state: RootState) => state.data);
  const blockChain = useAppSelector((state: RootState) => state.blockChain);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(detectAccount(modal));
  }, []);
  useEffect(() => {
    if (blockChain.account) {
      dispatch(fetchData());
    }
  }, [blockChain.account, blockChain.smartContract]);
  return (
    <div className="container">
      <div id="welcome">
        <h1>
          <span>Welcome To minting website 👋</span>
        </h1>
      </div>
      {blockChain.account ? (
        <Alert
          message={
            <Typography.Paragraph
              copyable={{
                tooltips: 'click to copy',
                text: blockChain.account,
              }}
            >
              {truncate(blockChain.account)}
            </Typography.Paragraph>
          }
          description={
            <>
              <Row>
                <Col span={24}>
                  <Typography.Paragraph>
                    Balance : {blockChain.balance}
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Row>
                <Col span={24} offset={7}>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      console.log(blockChain['signer-token']);
                      !blockChain['signer-token']
                        ? dispatch(signInToWallet(modal))
                        : dispatch(updateSignerToken({ signerToken: null }));
                    }}
                  >
                    {!blockChain['signer-token'] ? 'SIGN IN' : 'LOG OUT'}
                  </Button>
                </Col>
              </Row>
            </>
          }
          type="info"
        />
      ) : (
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          size={'large'}
          onClick={() => {
            dispatch(connect(modal));
          }}
        >
          Connect To Wallet
        </Button>
      )}
      {contextHolder}
    </div>
  );
}

export default Mint;
