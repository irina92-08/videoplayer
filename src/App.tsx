import './App.css';
import { VideoPlayer } from 'components/VideoPlayer';

const App: React.FC = () => {
  return (
    <div className="App">
      
        <h1>🎬 Video Player with XState</h1>
        <p>State Machine Implementation - Test Assignment</p>
        <VideoPlayer />
      
    </div>
  );
};

export default App;
