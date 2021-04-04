import React, { useEffect, useState } from 'react';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { Link, useHistory, useParams } from 'react-router-dom'
import { getDeveloperById, putDeveloper } from '../../../services/api';

import '../../../styles/pages/developer.css'

function UpdateDeveloperPage() {
    const { id } = useParams()
    const history = useHistory()
    const [name, setName] = useState('')
    const [sexo, setSexo] = useState('')
    const [idade, setIdade] = useState('')
    const [hobby, setHobby] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')

    async function developer() {
        const { response, error } = await getDeveloperById(id)

        if (error) {
            alert("Algo de errado não está certo!")
            return
        }

        const { name, sexo, idade, hobby, datanascimento } = response

        setName(name)
        setSexo(sexo)
        setIdade(idade)
        setHobby(hobby)
        setDataNascimento(datanascimento)
    }

    useEffect(() => {
        developer()
    }, [])

    async function putDeveloperForm(data, id) {
        const { error } = await putDeveloper(data, id)

        if (error) {
            alert(error.data.message)
            return
        }

        clearForm()
        alert(`Atualizacão realizada com sucesso!`)
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

        putDeveloperForm(data, id)
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
                        <BsBoxArrowInLeft size={26} color="rgba(0, 0, 0, 0.6)" alt="VOLTAR" />
                    </Link>
                    
                    <fieldset>
                        <legend>Atualizar o desenvolvedor <br/>
                            <strong>{name}</strong>
                        </legend>
                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input autoFocus id="name" value={name}
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

export default UpdateDeveloperPage;