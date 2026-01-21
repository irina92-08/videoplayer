import { createMachine } from "xstate";
import type { VideoContext, VideoEvent, VideoState } from "types/video.types";

export const videoMachine = createMachine<VideoContext, VideoEvent>({
    id: 'videoPlayer',
    initial: 'closed',
    predictableActionArguments: true,
    context: {
        url: 'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8',
        isPlaying: false,
        isMinimized: false,
    },
    states: {
        closed: {
            on: {
                OPEN: 'playing'
            }
        },
        playing: {
            on: {
                MINI: 'miniPlaying',
                PAUSE: 'paused',
                CLOSE: 'closed'
            }
        },
        paused: {
            on: {
                MINI: 'miniPaused',
                PLAY: 'playing',
                CLOSE: 'closed'
            }
        },
        miniPlaying: {
            on: {
                MAXI: 'playing',
                PAUSE: 'miniPaused',
                CLOSE: 'closed'
            }
        },
        miniPaused: {
            on: {
                MAXI: 'paused',
                PLAY: 'miniPlaying',
                CLOSE: 'closed'
            }
        }
    }
})