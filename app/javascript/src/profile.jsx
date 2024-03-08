// profile.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import exbook from '@src/img/exbook.jpg'
import exbook2 from '@src/img/exbook2.jpg'

import './stylesheets/app.scss';


const Profile = () => (
  <Layout>
    <div className="row text-secondary">
      <div className="col-12">
        <div className="row">
          <div className="user-img img-header w-100"></div>
        </div>
        <div className="row">
          <div className="col-10 offset-1 col-xxl-8 offset-xxl-2">
            <div className="row">
              <div className="col-12 mt-4 mb-4 p-3 bg-white rounded shadow-sm">
                <h2 className="text-center">User1's Bookshelf</h2>
              </div>
            </div>
            <div className="row mb-4 w-100">
              <div className=" col-12 p-4 bg-white rounded shadow-sm">
              <a href="book" className="link-opacity-25-hover link-secondary text-decoration-none"><img src={exbook} className="float-start bookCover rounded me-4"i/></a>
                <h4 className="d-inline me-2">Book Title</h4>
                <p className="d-inline">By <i>Author</i></p>
                <ul className="list-inline mt-1">
                  <li className="list-inline-item">Overall
                    <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                    <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                    <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                  </li>
                  <li className="list-inline-item">Story
                    <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                    <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                    <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                    <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                  </li>
                  <li className="list-inline-item">Style
                    <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                    <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                  </li>
                  <li className="list-inline-item">Steam
                    <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                    <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                    <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                  </li>
                </ul>
                <p className='review' style={{textIndent: "30px"}}>Book Review example: This book was example example example example example example example example example example example example example example example example</p>
              </div>
            </div>
            <div className="row mb-4 w-100">
              <div className=" col-12 p-4 bg-white rounded shadow-sm">
                <img src={exbook2} className="float-start bookCover rounded me-4"></img>
                    <h4 className="d-inline me-2">Book Title</h4>
                    <p className="d-inline">By <i>Author</i></p>
                  <ul className="list-inline mt-1">
                    <li className="list-inline-item">Overall
                      <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                    </li>
                    <li className="list-inline-item">Story
                      <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                    </li>
                    <li className="list-inline-item">Style
                      <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                    </li>
                    <li className="list-inline-item">Steam
                      <i className="fa-solid fa-star ps-1" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                      <i className="fa-solid fa-star" style={{color: '#6c757d'}}></i>
                    </li>
                  </ul>
                  <p className='review' style={{textIndent: "30px"}}>Book Review example: This book was example example example example example example example example example example example example example example example example</p>
              </div>
            </div>
          </div>
        </div>
       </div>
    </div>
  </Layout>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Profile />,
    document.body.appendChild(document.createElement('div')),
  )
})