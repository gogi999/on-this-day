import './index.css';

import React from 'react';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import ReactDOM from 'react-dom/client';

import App from './App';
import { firebaseConfig } from './constants.js';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
