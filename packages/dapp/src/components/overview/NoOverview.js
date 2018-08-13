import React from 'react';
import { Flex, WingBlank } from 'antd-mobile';

export const NoOverview = () => {
  return (
    <Flex
      className="full-height"
      justify="center"
      align="baseline"
      alignContent="center"
    >
      <Flex.Item>
        <WingBlank size="lg">
          <h2>Sorry</h2>
        </WingBlank>
      </Flex.Item>
    </Flex>
  );
};
