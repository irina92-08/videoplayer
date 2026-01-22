import React from 'react';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ShrinkOutlined,
  ArrowsAltOutlined,
} from '@ant-design/icons';
import { Button, Flex } from 'antd';

interface ControlsProps {
  isPlaying: boolean;
  isMini: boolean;
  onPlay: () => void;
  onPause: () => void;
  onMini: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  isMini,
  onPlay,
  onPause,
  onMini,
}) => {
  return (
    <Flex gap="small" justify="flex-end" wrap>
      {isMini ? (
        <Button
          variant="outlined"
          onClick={onMini}
          shape="circle"
          color="default"
          size="large"
          icon={<ArrowsAltOutlined />}
          title="Развернуть"
        />
      ) : (
        <Button
          variant="outlined"
          onClick={onMini}
          shape="circle"
          color="default"
          size="large"
          icon={<ShrinkOutlined />}
          title="Свернуть"
        />
      )}
      {isPlaying ? (
        <Button
          variant="outlined"
          onClick={onPause}
          shape="circle"
          color="default"
          size="large"
          icon={<PauseCircleOutlined />}
          title="Пауза"
        />
      ) : (
        <Button
          variant="outlined"
          onClick={onPlay}
          shape="circle"
          color="default"
          size="large"
          icon={<PlayCircleOutlined />}
          title="Воспроизвести"
        />
      )}
    </Flex>
  );
};
