import { DownloadOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks/useReducer';
import { connect, detectAccount } from '../redux/blockchain/blockchainAction';
import { fetchData } from '../redux/data/dataActions';
import { RootState } from '../redux/store';
import { truncate } from '../utils/ethereum';
import { Alert, Button, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';

export function Index() {
  const data = useAppSelector((state: RootState) => state.data);
  const blockChain = useAppSelector((state: RootState) => state.blockChain);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(detectAccount() as any);
  }, []);
  useEffect(() => {
    if (blockChain.account) {
      dispatch(fetchData() as any);
    }
  }, [blockChain.account, blockChain.smartContract]);
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome website 👋
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
                <Typography.Paragraph>
                  Balance : {blockChain.balance}
                </Typography.Paragraph>
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
                dispatch(connect());
              }}
            >
              Connect To Wallet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
