import React, { useState } from 'react';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
import { postDeveloper } from '../../../services/api';

import '../../../styles/pages/developer.css'

function CreateDeveloperPage() {
    const history = useHistory()
    const [name, setName] = useState('')
    const [sexo, setSexo] = useState('')
    const [idade, setIdade] = useState('')
    const [hobby, setHobby] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')

    async function postDeveloperForm(data) {
        const { response, error } = await postDeveloper(data)

        if (error) {
            alert(error.data.message)
            return
        }

        clearForm()
        alert(`Cadastro de ${response.name} realizado com sucesso!`)
        history.push('/')
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const data = {
            name: name,
            sexo: sexo,
            idade: parseInt(idade),
            hobby: hobby,
            datanascimento: dataNascimento
        }

        postDeveloperForm(data)
    }

    function clearForm() {
        setName('')
        setSexo('')
        setIdade('')
        setHobby('')
        setDataNascimento('')
    }

    return (
        <div onSubmit={handleSubmit} id="page-create-developer">
            <main>
                <form className="create-developer-form">
                    <Link to='/' className="link">
                        <BsBoxArrowInLeft size={26} color="rgba(0, 0, 0, 0.6)" />
                    </Link>
                    <fieldset>
                        <legend>Criar novo desenvolvedor</legend>
                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input id="name" autoFocus value={name}
                                onChange={event => setName(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="sexo">Sexo <span>M = Masculino | F = Feminino</span></label>
                            <input maxLength={1} id="sexo" value={sexo}
                                onChange={event => setSexo(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="idade">Idade</label>
                            <input type="number" id="idade" value={idade}
                                onChange={event => setIdade(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="dataNascimento">Data de Nascimento <span>Data de nascimento deve bater com a idade</span></label>
                            <input type="date" id="dataNascimento" value={dataNascimento}
                                onChange={event => setDataNascimento(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="hobby">Hobby <span>Máximo de 200 caracteres</span></label>
                            <textarea
                                id="hobby"
                                maxLength={200}
                                value={hobby}
                                onChange={event => setHobby(event.target.value)}
                            />
                        </div>
                    </fieldset>
                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    )
}

export default CreateDeveloperPage;