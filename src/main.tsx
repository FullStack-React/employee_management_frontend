import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { store, persistor } from './app/store';
import { client } from './app/client';
import './index.css';
import { Toaster } from './components/ui/toaster';
import { PersistGate } from 'redux-persist/es/integration/react';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
            <Toaster />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </React.StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
