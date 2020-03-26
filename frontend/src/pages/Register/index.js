import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import InputMask from 'react-input-mask';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    function validInputs(){
        const inputName = document.getElementById('inputName');
        const inputEmail = document.getElementById('inputEmail');
        const inputWhatsapp = document.getElementById('inputWhatsapp');
        const inputCity = document.getElementById('inputCity');
        const inputUf = document.getElementById('inputUf');

        const listInput = [inputName, inputEmail, inputWhatsapp, inputCity, inputUf];
        
        var firstInvalid = null;
        var valid = true;
        const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF',
        'ES', 'GO', 'MA', 'MT' ,'MS' , 'MG', 'PA', 'PB', 'PE',
        'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

        for(var input of listInput){
            if(listInput.indexOf(input) === 2){ //whatsapp
                if(whatsapp.trim().length < 15){
                    input.classList.remove('valid');
                    inputWhatsapp.classList.add('invalid');
                    if(!firstInvalid) firstInvalid = inputWhatsapp;
                    valid = false;
                }
                else{
                    inputWhatsapp.classList.remove('invalid');
                    inputWhatsapp.classList.add('valid');
                }
            }else if (listInput.indexOf(input) === 4){
                if(ufs.indexOf(uf) === -1){
                    input.classList.remove('valid');
                    inputUf.classList.add('invalid');
                    if(!firstInvalid) firstInvalid = inputUf;
                    valid = false;
                }
                else{
                    inputUf.classList.remove('invalid');
                    inputUf.classList.add('valid');
                }
            }else{
                if(input.value === ""){
                    input.classList.remove('valid');
                    input.classList.add('invalid');
                    if(!firstInvalid) firstInvalid = input;
                    valid = false;
                }else{
                    input.classList.remove('invalid');
                    input.classList.add('valid');
                }
            }
        }

        if(firstInvalid) firstInvalid.focus();
        return valid;
    }

    async function handleRegister(event){
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {            
            if(validInputs()){
                const res = await api.post('ongs', data);
                
                alert(`Sua ID de acesso ${res.data.id}`);
    
                history.push('/');
            }
        } catch (error) {
            console.error(error);
            alert('Erro no banco de dados, tente novamente.')
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>
                    
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        id="inputName"
                        placeholder="Nome da ONG *"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        id="inputEmail"
                        type="email"
                        placeholder="E-mail *"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <InputMask
                        id="inputWhatsapp"
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        mask="(99) 99999-9999"
                        maskChar=" "
                    />

                    <div className="input-group">
                        <input
                            id="inputCity"
                            placeholder="Cidade *"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input
                            id="inputUf"
                            placeholder="UF *" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value.toUpperCase())}
                            maxLength={2}
                        />
                    </div>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}