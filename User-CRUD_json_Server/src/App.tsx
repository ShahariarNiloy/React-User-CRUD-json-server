import React from 'react';
import logo from './logo.svg';
import {ReactQueryDevtools} from 'react-query/devtools'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {QueryClientProvider, QueryClient} from 'react-query'
import HomePage from './components/HomePage';
import ShowUserInfo from './components/ShowUserInfo';
import CreateUser from './components/CreateUser';
import EditUserInfo from './components/EditUserInfo';

const queryClient = new QueryClient()

function App() {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <Router>
            <Routes>
              <Route path="/"  element={<HomePage />} />
              <Route path="/create"  element={<CreateUser />} />
              <Route path="/edit/:id"  element={<EditUserInfo />} />
              <Route path="/show/:id"  element={<ShowUserInfo />} /> 
              <Route path="*"  element={<HomePage />} />
            </Routes>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'}/>
      </QueryClientProvider> 
    </div>
  );
}

export default App;
