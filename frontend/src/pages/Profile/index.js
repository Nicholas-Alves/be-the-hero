import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    
    const [incidents, setIncidents] = useState([])

    //[<boolean>, <incident_id>]
    const [excluding, setExcluding] = useState({});

    const history = useHistory();

    const variants = {
        in: {
            opacity: 1
        },
        out: {
            opacity: 0
        }
    }
    
    const transitions = {
        duration: 1
    }

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setExcluding({ex: false, id: null});
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            console.log(error);
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.removeItem('ongId');
        localStorage.removeItem('ongName');

        history.push('/');
    }

    return (
        <motion.div
            className="profile-container"
            initial={"out"}
            animate={"in"}
            exit={"out"}            
            variants={variants}
            transition={transitions}
        >
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <motion.li
                        key={incident.id}
                        initial={{opacity: 0}}
                        animate={excluding.ex === true && excluding.id === incident.id ? {opacity: 0} : {opacity: 1}}
                        whileHover={{scale: 1.03}}
                    >
                        <div className="li-content">
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                            <button onClick={() => {
                                setExcluding({ex: true, id: incident.id});
                                setTimeout(() => handleDeleteIncident(incident.id), 200);
                            }} type="button">
                                <FiTrash2 sixe={20} color="#a8a8b3" />
                            </button>
                        </div>
                    </motion.li>
                ))}                
            </ul>
        </motion.div>
    );
}
