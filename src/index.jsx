import * as $ from 'jquery'
import Post from '@models/post'
import './styles/style.css'
import '@/styles/less.less'
import '@/styles/scss.scss'
import json from '@/assets/json.json'
import image from '@/assets/front.png'
import './babel.js'
import {createRoot} from 'react-dom/client';
import React, { Component } from 'react';

const post = new Post('Webpack Post Title', image)


const App = () => (
    <div className="container">
        <h1>Webpack course</h1>

        <hr/>

        <div className="logo"></div>
        <hr/>

        <pre>{post.toString()}</pre>
        <hr/>

        <div className="box">
            <h2>Less</h2>
        </div>
        
        <div className="card">
            <h2>SCSS</h2>
        </div>
    </div>

)

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App tab="home" />)


// console.log('Post to string: ', post.toString())
// console.log('JSON:', JSON.stringify(json))