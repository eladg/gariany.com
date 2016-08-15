// remove loader
var LoaderContiner = document.getElementById('loader-continer');
document.body.removeChild(LoaderContiner);

// ============================ //
//  load the webgl application  //
// ============================ //

var WebGL     = require("./webgl.js");
var WebGLCss  = require('./css/webgl.css');
var WebGLElem = document.getElementById('canvas');
WebGL.init(WebGLElem);
WebGL.animate();

// ============================ //
//  load the react application  //
// ============================ //

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import MainPanel from './components/main-panel';

import React    from 'react';
import ReactDOM from 'react-dom';

var siteData = require("./site.json");
var mainCss  = require('./css/app.css');

var container = document.getElementById("app");
ReactDOM.render( <MainPanel data={siteData}/> , container );

