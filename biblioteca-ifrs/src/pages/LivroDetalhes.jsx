import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const LivroDetalhes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [livro, setLivro] = useState(null);

    const fetchLivro = async () => {
        try {
            const response = await api.get(`/${id}`);
            setLivro(response.data);
        } catch (error) {
            console.error('Erro ao buscar o livro:', error); // Trata erros ao buscar o livro
        }
    };

    useEffect(() => {
        fetchLivro();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await api.delete(`/${id}`);
            console.log('Status:', response.status); // Imprime o status no console
            navigate('/'); // Navega para a página inicial após a deleção
        } catch (error) {
            console.error('Erro ao deletar o livro:', error); // Trata erros e imprime no console
        }
    };

    if (!livro) return <p>Carregando...</p>;

    return (
        <div className="container">
            <div className="title-container">
                <h1>{livro.title}</h1>
            </div>
            <p>{livro.description}</p>
            <div>
                <button onClick={handleDelete}>Deletar</button>
                <Link to={`/editar/${id}`}>
                    <button>Editar</button>
                </Link>
            </div>
        </div>
    );
};

export default LivroDetalhes;
