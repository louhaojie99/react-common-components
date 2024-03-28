# react-common-components
反应常见组件


## AsyncButton

```tsx

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

```

使用 AsyncButton 组件的栗子：

```tsx

<AsyncButton
  type="primary"
  onClick={async () => {
    // 这里可以执行异步操作，比如发起网络请求
    console.log('异步操作开始');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('异步操作结束');
  }}
>
  点击我
</AsyncButton>

```