import React from 'react';
import { parseEth, truncate } from '../utils/ethereum';
import { Alert, Button, Col, message, Modal, Row, Typography } from 'antd';
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
import { resetState } from '../redux/blockchain/blockChain.slice';
import MintCounter from '@nft/apps/website/components/MintCounter';

function Account() {
  const [modal, contextHolder] = Modal.useModal();
  const data = useAppSelector((state: RootState) => state.data);
  const blockChain = useAppSelector((state: RootState) => state.blockChain);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(detectAccount());
  }, []);
  useEffect(() => {
    if (blockChain.data?.account) {
      dispatch(fetchData());
    }
  }, [blockChain.data?.account, blockChain.data?.smartContract]);
  useEffect(() => {
    if (blockChain.error) message.error(blockChain.error);
  }, [blockChain.error]);
  const claimNFTs = async (mintAmount: number) => {
    const cost = parseEth(data.data?.cost) as any;
    const totalCostWei = String(cost * mintAmount);

    try {
      const tx = await blockChain.data?.smartContract.mint(mintAmount, {
        value: totalCostWei,
      });
      await tx.wait();
      dispatch(fetchData());
    } catch (err) {
      message.error(err.reason);
    }
  };
  return (
    <div className="container">
      <div id="welcome" style={{ textAlign: 'center' }}>
        <h1>
          <span>Welcome To minting website 👋</span>
        </h1>
      </div>
      {blockChain.data?.account ? (
        <>
          <Alert
            style={{ width: '500px' }}
            message={
              <Typography.Paragraph
                copyable={{
                  tooltips: 'click to copy',
                  text: blockChain.data?.account,
                }}
              >
                {truncate(blockChain.data?.account)}
              </Typography.Paragraph>
            }
            description={
              <>
                <Row>
                  <Col span={18}>
                    <Typography.Paragraph>
                      Balance : {blockChain.data?.balance}
                    </Typography.Paragraph>
                  </Col>
                  <Col span={6} style={{ margin: '-28px' }}>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        !blockChain.data?.['signer-token']
                          ? dispatch(signInToWallet(modal))
                          : dispatch(resetState());
                      }}
                    >
                      {!blockChain.data?.['signer-token']
                        ? 'SIGN IN'
                        : 'LOG OUT'}
                    </Button>
                  </Col>
                </Row>
                {blockChain.data?.['signer-token'] ? (
                  <Row>
                    <MintCounter claimNFTs={claimNFTs} />
                  </Row>
                ) : null}
              </>
            }
            type="info"
          />
          {/* <MintCounter /> */}
        </>
      ) : (
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          size={'large'}
          onClick={() => {
            dispatch(connect());
          }}
        >
          Connect To Wallet
        </Button>
      )}
      {contextHolder}
    </div>
  );
}

export default Account;
