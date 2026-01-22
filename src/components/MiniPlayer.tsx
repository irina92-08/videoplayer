import React from "react";
import ReactPlayer from 'react-player'
import { useMachine } from "@xstate/react";
import { Modal, Button, Flex, Typography} from "antd";
import { videoMachine } from "machines/videoMachine";
import {PlayCircleOutlined, CloseOutlined} from '@ant-design/icons'
import { Controls } from "./Controls";

interface MiniPlayerProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onMini: () => void;
  onClose: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onMini,
  onClose
}) => {
    
    const { Title } = Typography;

    return (
        <Modal
            open={true}
            width="40vw"
            footer={null}
            closable={false}
            styles={{ body: { padding: 0 } }}
        >
            <Flex vertical>
                <Flex gap="small" justify='space-between' wrap>
                    <Title level={3} style={{ textTransform: 'uppercase' }}>
                        PLAYER
                    </Title>
                    <Button variant="link" color='default' onClick={onClose} icon={<CloseOutlined />} size='large'/>
                </Flex>
        <ReactPlayer
            src=''
            playing={isPlaying}
            width="100%"
            height="169px"
            controls={false}
        />
        <Controls
            isPlaying={isPlaying}
            isMini={true}
            onPlay={onPlay}
            onPause={onPause}
            onMini={onMini}
        />
        </Flex>
        </Modal>
    );
};


export default MiniPlayer;