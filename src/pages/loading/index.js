import React from 'react';
import Spinner from 'react-spinkit'
import './styles.css';


export default function Loading() {

    return (
        <div className='overlay-content'>
            <div className='wrapper'>
                <Spinner
                    name='folding-cube'
                    fadeIn='none'
                    color='yellow'
                />
                <span className='message'>
                    LOADING
            </span>
            </div>
        </div>
    );

}