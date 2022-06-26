import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Routes,
  Route,
  HashRouter
} from "react-router-dom";
import App from "./App";
import ArticlePage from './components/articlepage';
import Homepage from './components/homepage';
import Login from './components/login';
import ArticleCreate from './components/postarticle'
import './stylesheets/index.css';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement)

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route index element={<Homepage />}/>
        <Route path="article/:id" element={<ArticlePage />} />
        <Route path="article" element={< ArticleCreate />}/>
        <Route path="login" element={<Login/>} />
      </Route>
    </Routes>
  </HashRouter>
  );


