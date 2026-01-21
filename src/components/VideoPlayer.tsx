import React from "react";
import ReactPlayer from 'react-player'
import { useMachine } from "@xstate/react";
import { Modal, Button } from "antd";
import { videoMachine } from "machines/videoMachine";
import {PlayCircleOutlined} from '@ant-design/icons'

export const VideoPlayer: React.FC = () => {
    const [state, send] = useMachine(videoMachine)
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
        //footer={null}
        closable={false}
        styles={{ body: { padding: 0 } }}
      >
        <div>
          <ReactPlayer
            src={state.context.url}
            playing={state.value === 'playing'}
            width="100%"
            height="70vh"
            muted={true}
            controls={false}
          />

        </div>
      </Modal>
    )}
    return null
}