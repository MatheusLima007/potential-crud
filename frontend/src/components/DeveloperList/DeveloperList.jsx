import React, { useEffect, useState } from "react"
import { FiArrowLeft, FiArrowRight, FiEdit } from "react-icons/fi"
import { RiDeleteBinLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { getDeveloper, deleteDeveloper } from "../../services/api/api"

export const DeveloperList = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()

    async function developer(data) {
        const { response, error } = await getDeveloper(data)

        if (error) {
            alert("Algo de errado não está certo!")
            return
        }

        setList(response.rows)
        setTotalPage(response.count) 

    }

    useEffect(() => {
        developer()
    }, [])

    async function developerDelete(id) {
        const { error } = await deleteDeveloper(id)

        if (error) {
            alert("Algo de errado não está certo!")
            return
        }

        developer()
        alert('deletado com sucesso!')
    }

    function pageLeft() {
        if(page > 1){
            developer(page - 1)
            setPage(page - 1)
            
        }
    }

    function pageRigth() {
        if(page < totalPage/8){
            developer(page + 1)
            setPage(page + 1)
        }
    }

    function formatData(data) {
        let dataFormat = data.split('-')
        return `${dataFormat[2]}/${dataFormat[1]}/${dataFormat[0]}`
    }

    return ( 
        list ? (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th className="nome">Nome</th>
                            <th className="sexo">Sexo</th>
                            <th className="idade">Idade</th>
                            <th className="hobby">Hobby</th>
                            <th className="datanascimento">Data de nascimento</th>
                            <th className="opcoes">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list?.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.sexo}</td>
                                    <td>{data.idade}</td>
                                    <td>{data.hobby}</td>
                                    <td>
                                        {
                                            formatData(data.datanascimento)
                                        }
                                    </td>
                                    <td>
                                        <span 
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => developerDelete(data.id)}
                                        >
                                            <RiDeleteBinLine size={26} color="#000" />
                                        </span>
                                        <Link to={`/updatedeveloper/${data.id}`}>
                                            <FiEdit size={24} color="#000" />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="pagination">
                    <button
                        style={{ cursor: 'pointer', border: 0, background: 'none', marginRight: '10px' }}
                        onClick={() => pageLeft()}
                    >
                        <FiArrowLeft size={24} color="#000" />
                    </button>
                    {
                        page
                    }
                    <button
                        style={{ cursor: 'pointer', border: 0, background: 'none', marginLeft: '10px' }}
                        onClick={() => pageRigth()}
                    >
                        <FiArrowRight size={24} color="#000" />
                    </button>
                </div>
            </div>
        )
            : ''
    )
}