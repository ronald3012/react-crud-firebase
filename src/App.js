
import { useUser } from 'reactfire';
import Auth from './Auth';
import TaskList from './TaskList';

function App() {
const user = useUser();

return (
    <div className="App">
      <h1>Api React and Firebase</h1>
          <Auth />
          { user.data && <TaskList />}
    </div>
  );
}

export default App;
