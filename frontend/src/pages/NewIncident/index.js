import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    const variants = {
        in: {
            opacity: 1,
            x: 0
        },
        out: {
            opacity: 0,
            x: "100vw"
        }
    }
    
    const transitions = {
        duration: 1
    }

    function validInputs(){
        const inputs = [
            document.getElementById('inputTitle'),
            document.getElementById('inputDescription'),
            document.getElementById('inputValue'),
        ];

        var valid = true;
        var firstInvalid = null;

        for(var input of inputs){
            if(input.value === ""){
                valid = setInput(input, false);
                if(!firstInvalid) firstInvalid = input;
            }else{
                valid = setInput(input, true);
            }
        }
        if(firstInvalid) firstInvalid.focus();
        return valid;
    }

    function setInput(input, valid){
        if(valid){
            input.classList.remove('invalid');
            input.classList.add('valid');
            return true;
        }else{
            input.classList.remove('valid');
            input.classList.add('invalid');
            return false;
        }
    }

    async function handleSubmit(event){
        event.preventDefault();
        try {
            if(validInputs()){
                const data = {
                    title,
                    description,
                    value
                }

                await api.post('incidents', data, {
                    headers: {
                        Authorization: ongId,
                    }
                });

                history.push('/profile');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar caso, tente novamente');
        }
    }

    return (
        <motion.div
            className="new-incident-container"
            initial="out"
            animate="in"
            exit="out"
            variants={variants}
            transition={transitions}
        >
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form>
                    <input
                        id="inputTitle"
                        placeholder="Título do caso"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />

                    <textarea
                        id="inputDescription"
                        placeholder="Descrição"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />

                    <input
                        id="inputValue"
                        placeholder="Valor em reais"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />

                    <button onClick={handleSubmit} type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </motion.div>
    );
}
