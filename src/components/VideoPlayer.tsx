import React from "react";
import ReactPlayer from 'react-player'
import { useMachine } from "@xstate/react";
import { Modal, Button, Flex, Typography} from "antd";
import { videoMachine } from "machines/videoMachine";
import {PlayCircleOutlined, CloseOutlined} from '@ant-design/icons'
import { Controls } from "./Controls";

export const VideoPlayer: React.FC = () => {
    const [state, send] = useMachine(videoMachine)
    const { Title } = Typography;
    console.log(state)

    const handlePlay = () => send({ type: 'PLAY' });
    const handlePause = () => send({ type: 'PAUSE' });
    const handleMini = () => send({ type: 'MINI' });
    const handleMaxi = () => send({ type: 'MAXI' });
    const handleClose = () => send({ type: 'CLOSE' });

    if(state.value === 'closed')
    {return (
       <Button 
            color='purple' 
            variant="outlined" 
            icon={<PlayCircleOutlined style={{ fontSize: '64px' }} />}
            style={{
                width: '400px',
                height: '200px',
                borderWidth: '4px'
            }}
            onClick={() => {send('OPEN')}}
        />
    )}
    if(state.value === 'playing' || state.value === 'paused'){
    return(
        <Modal
        open={true}
        width="90vw"
        footer={null}
        closable={false}
        styles={{ body: { padding: 0 } }}
      >
        <Flex vertical>
            <Flex gap="small" justify='space-between' wrap>
                <Title level={3} style={{ textTransform: 'uppercase' }}>
                    PLAYER
                </Title>
            
                <Button variant="link" color='default' onClick={handleClose} icon={<CloseOutlined />} size='large'/>
            </Flex>
            <ReactPlayer
                src={state.context.url}
                playing={state.value === 'playing'}
                width="100%"
                height="70vh"
                muted={true}
                controls={false}
            />
            <Controls
                isPlaying={state.value === 'playing'}
                isMini={false}
                onPlay={handlePlay}
                onPause={handlePause}
                onMini={handleMini}
                onMaxi={handleMaxi}
            />
        </Flex>
        
      </Modal>
    )}
    return null
}