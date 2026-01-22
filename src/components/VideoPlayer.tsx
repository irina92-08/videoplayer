import React from "react";
import ReactPlayer from 'react-player'
import { useMachine } from "@xstate/react";
import { Modal, Button, Flex, Typography} from "antd";
import { videoMachine } from "machines/videoMachine";
import {PlayCircleOutlined, ShrinkOutlined, PauseCircleOutlined, CloseOutlined} from '@ant-design/icons'

export const VideoPlayer: React.FC = () => {
    const [state, send] = useMachine(videoMachine)
    const { Title } = Typography;
    console.log(state)

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
            
                <Button variant="link" color='default' onClick={() => {send('CLOSE')}} icon={<CloseOutlined />} size='large'/>
            </Flex>
            <ReactPlayer
                src={state.context.url}
                playing={state.value === 'playing'}
                width="100%"
                height="70vh"
                muted={true}
                controls={false}
            />
            <Flex gap="small" justify='flex-end' wrap>
            <Button variant="outlined" shape="circle" color='default' onClick={() => {send('MINI')}} icon={<ShrinkOutlined />} size='large' />
            <Button variant="outlined" shape="circle" color='default' onClick={() => {send('PAUSE')}} icon={<PauseCircleOutlined />} size='large'/>
            </Flex>
        </Flex>
        
      </Modal>
    )}
    return null
}