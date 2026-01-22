import React from 'react';
import ReactPlayer from 'react-player';
import { useMachine } from '@xstate/react';
import { Modal, Button, Flex, Typography } from 'antd';
import { videoMachine } from 'machines/videoMachine';
import { PlayCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Controls } from './Controls';

export const VideoPlayer: React.FC = () => {
  const [state, send] = useMachine(videoMachine);
  const { Title } = Typography;
  console.log(state);

  const handlePlay = () => send({ type: 'PLAY' });
  const handlePause = () => send({ type: 'PAUSE' });
  const handleMini = () => send({ type: 'MINI' });
  const handleMaxi = () => send({ type: 'MAXI' });
  const handleClose = () => send({ type: 'CLOSE' });

  const isPlaying = state.value === 'playing' || state.value === 'miniPlaying';
  const isFullSize = state.value === 'playing' || state.value === 'paused';

  const renderPlayer = () => {
    switch (state.value) {
      case 'playing':
      case 'paused':
        return (
          <Controls
            isPlaying={state.value === 'playing'}
            isMini={false}
            onPlay={handlePlay}
            onPause={handlePause}
            onMini={handleMini}
          />
        );
      case 'miniPlaying':
      case 'miniPaused':
        return (
          <Controls
            isPlaying={state.value === 'miniPlaying'}
            isMini={true}
            onPlay={handlePlay}
            onPause={handlePause}
            onMini={handleMaxi}
          />
        );
      default:
        return null;
    }
  };

  if (state.value === 'closed') {
    return (
      <Button
        color="purple"
        variant="outlined"
        icon={<PlayCircleOutlined style={{ fontSize: '64px' }} />}
        style={{
          width: '400px',
          height: '200px',
          borderWidth: '4px',
        }}
        onClick={() => {
          send('OPEN');
        }}
      />
    );
  }

  return (
    <Modal
      open={true}
      width={isFullSize ? '90vw' : '40vw'}
      footer={null}
      closable={false}
      styles={{ body: { padding: 0 } }}
    >
      <Flex vertical>
        <Flex gap="small" justify="space-between" wrap>
          <Title level={3} style={{ textTransform: 'uppercase' }}>
            PLAYER
          </Title>

          <Button
            variant="link"
            color="default"
            onClick={handleClose}
            icon={<CloseOutlined />}
            size="large"
          />
        </Flex>
        <ReactPlayer
          src={state.context.url}
          playing={isPlaying}
          width="90%"
          height={isFullSize ? '70vh' : '40vh'}
          muted={true}
          controls={false}
        />
        {renderPlayer()}
      </Flex>
    </Modal>
  );
};

export default VideoPlayer;
