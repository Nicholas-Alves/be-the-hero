import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function(){    
    const [id, setId] = useState('');

    const history = useHistory();

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
        try {
            const inputId = document.getElementById('inputId')
            if(validInputs(inputId)){                
                const res = await api.post('sessions', { id });

                if(res.data === null) setInput(document.getElementById('inputId'), false);
                else setInput(inputId, true);

                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', res.data.name);

                history.push('/profile');
            }else setInput(inputId, false);
        } catch (error) {
            console.error(error);
            alert('Falha no login, tente novamente');
        }
    }

    return(
        <div className="logon-container">
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
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>                    
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}