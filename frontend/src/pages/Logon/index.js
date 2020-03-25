import React from 'react';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function(){
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form>
                    
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}