export interface VideoContext {
  url: string;
  isPlaying: boolean;
  isMinimized: boolean;
}

export type VideoEvent =
  | { type: 'OPEN' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'MINI' }
  | { type: 'MAXI' }
  | { type: 'CLOSE' }

export type VideoState =
  | { value: 'closed'; context: VideoContext }
  | { value: 'playing'; context: VideoContext }
  | { value: 'paused'; context: VideoContext }
  | { value: 'miniPlaying'; context: VideoContext }
  | { value: 'miniPaused'; context: VideoContext }