import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { routers } from './route/Router';
import "bootstrap/dist/css/bootstrap.css";
import { RecoilRoot } from 'recoil'


function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={routers} />
    </RecoilRoot>
  );
}

export default App;
