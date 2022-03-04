import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import {API} from "./config";

axios.defaults.baseURL=API;

ReactDOM.render(<App/>, document.getElementById('root'));
