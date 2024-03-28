/**
 * 一个支持异步的按钮，onClick 传入异步函数则自动显示loading
 */
import React, { useState } from 'react';
import { Button, type ButtonProps } from 'antd';

const AsyncButton = React.memo<ButtonProps>(props => {
  const { onClick, ...restProps } = props;
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  const handleClick: ButtonProps['onClick'] = async e => {
    if (!onClick) return;

    try {
      setLoading(true);
      await onClick?.(e);
    } finally {
      setLoading(false);
    }
  };

  return <Button loading={loading} onClick={handleClick} {...restProps} />;
});

export default AsyncButton;
