import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Image } from 'antd';
import { RootState } from '@nft/apps/website/redux/store';

function MintCounter({ claimNFTs }) {
  const data = useSelector((state: RootState) => state.data);
  const [mintAmount, setMintAmount] = useState(1);

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };
  return (
    <>
      <Col
        span={24}
        style={{ display: 'flex', justifyContent: 'center', color: '#707070' }}
      >
        Name : {data.data?.name || 'Sample NFT'}
      </Col>
      <Col
        span={24}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200,
          boxSizing: 'border-box',
          padding: '2rem 2rem',
          marginTop: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '400px',
            height: '80px',
            border: '2px dashed white',
            padding: '1rem 1rem',
            borderRadius: '25px 25px',
          }}
        >
          <Button
            style={{
              borderRadius: '50%',
              backgroundColor: 'white',
              color: 'black',
            }}
            onClick={(e) => {
              e.preventDefault();
              decrementMintAmount();
            }}
          >
            -
          </Button>
          <h2 style={{ color: '#707070' }}>{mintAmount}</h2>
          <Button
            style={{
              borderRadius: '50%',
              backgroundColor: 'white',
              color: 'black',
            }}
            onClick={(e) => {
              e.preventDefault();
              incrementMintAmount();
            }}
          >
            +
          </Button>
        </div>
      </Col>
      <Col
        md={24}
        style={{ display: 'flex', justifyContent: 'center', color: '#707070' }}
      >
        1 NFT = {data.data?.cost} ETH
      </Col>
      <Col md={24} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="primary"
          ghost
          size="middle"
          onClick={() => claimNFTs(mintAmount)}
        >
          Mint
        </Button>
      </Col>
      <Col
        md={24}
        style={{ display: 'flex', justifyContent: 'center', color: '#707070' }}
      >
        Total Minted {data.data?.totalSupply}/{data.data?.maxSupply}
      </Col>
    </>
  );
}

export default MintCounter;
