import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import Header from './components/Header';
import Terminal from './components/Terminal';
import Footer from './components/Footer';
import { BASE_COMMANDS } from './types';

const TerminalPage = ({ command }: { command: string }) => {
  return (
    <Terminal
      command={command}
    />
  );
};

const DynamicTerminalPage = () => {
  const location = useLocation();
  return <TerminalPage command={location.pathname} />;
};

const App = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      const path = window.location.pathname;
      // If it's a valid path, keep it; otherwise redirect to home
      if (path === '/' || path.startsWith('/')) {
        window.history.replaceState({}, '', path);
      } else {
        window.history.replaceState({}, '', BASE_COMMANDS.HOME);
      }
    }
  }, [initialLoad]);

  return (
    <BrowserRouter>
      <div className="bg-black text-green-400 min-h-screen font-mono antialiased">
        <div className="max-w-3xl w-full mx-auto p-4 md:p-8 min-h-screen">
          <Routes>
            <Route path={BASE_COMMANDS.HOME} element={<Header />} />
            <Route path={BASE_COMMANDS.ABOUT} element={<TerminalPage command={BASE_COMMANDS.ABOUT} />} />
            <Route path={BASE_COMMANDS.REGION} element={<TerminalPage command={BASE_COMMANDS.REGION} />} />
            <Route path={BASE_COMMANDS.FACILITY} element={<TerminalPage command={BASE_COMMANDS.FACILITY} />} />
            <Route path={BASE_COMMANDS.RAILWAY} element={<TerminalPage command={BASE_COMMANDS.RAILWAY} />} />
            <Route path={BASE_COMMANDS.RECRUITMENT} element={<TerminalPage command={BASE_COMMANDS.RECRUITMENT} />} />
            <Route path={BASE_COMMANDS.SERVER} element={<TerminalPage command={BASE_COMMANDS.SERVER} />} />
            
            {/* Dynamic routes for sub-pages */}
            <Route path="/region/*" element={<DynamicTerminalPage />} />
            <Route path="/facility/*" element={<DynamicTerminalPage />} />
            
            {/* Catch-all route for any other pages */}
            <Route path="/*" element={<DynamicTerminalPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;