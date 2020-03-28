import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';
import { motion } from 'framer-motion';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function(){    
    const [id, setId] = useState('');    

    const history = useHistory();

    const variants = {
        in: {
            opacity: 1,
            x: 0,
        },
        out: {
            opacity: 0,
            x: "-100vw"
        }
    }
    
    const transitions = {
        duration: 1.25
    }

    function validInputs(input){
        if(input.value === "") return false;
        return true;
    }

    function setInput(input, valid){
        if(valid){
            input.classList.remove('invalid');
            input.classList.add('valid');
        }else{
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    }

    async function handleLogin(event){
        event.preventDefault();
        const inputId = document.getElementById('inputId')
        try {
            if(validInputs(inputId)){                
                const res = await api.post('sessions', { id });
                
                setInput(inputId, true);
                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', res.data.name);
                setTimeout(() => history.push('/profile'), 300);                
            }else setInput(inputId, false);
        } catch (error) {
            var errorCode = error.message[32];
            errorCode += error.message[33];
            errorCode += error.message[34];

            if(errorCode === '406') setInput(inputId, false);
            alert('Erro no login, tente novamente');            
        }
    }

    return(
        <div className="logon-container">
            <motion.div
                className="content"
                initial="out"
                animate="in"
                exit="out"
                variants={variants}
                transition={transitions}
            >
                <section className="form">
                    <img src={logoImg} alt="Be The Hero"/>

                    <form onSubmit={handleLogin}>
                        <h1>Faça seu logon</h1>

                        <input
                            id="inputId"
                            placeholder="Sua ID"
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                        <button className="button" type="submit"> Entrar </button>

                        <Link className="back-link" to="/register">
                            <FiLogIn size={16} color="#E02041" />
                            Não tenho cadastro
                        </Link>                    
                    </form>
                </section>
                <img src={heroesImg} alt="Heroes"/>
            </motion.div>
        </div>
    )
}