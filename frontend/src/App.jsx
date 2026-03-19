import React from 'react';
import { AppRoutes } from './app.routes';
import { AuthProvider } from './features/auth';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
