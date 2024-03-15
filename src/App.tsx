import 'react-quill/dist/quill.snow.css';
import './App.css'
import {LiveEditor} from './components/LiveEditor';
import { EditorProvider } from './context/EditorProvider';

function App() {


  return (
      <EditorProvider>
        <LiveEditor/>
      </EditorProvider>
  )
}

export default App
