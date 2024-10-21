import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const LivroDetalhes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [livro, setLivro] = useState(null);

    const fetchLivro = async () => {
        const response = await api.get(`/${id}`);
        setLivro(response.data);
    };

    useEffect(() => {
        fetchLivro();
    }, [id]);

    const handleDelete = async () => {
        await api.delete(`/${id}`);
        navigate('/');
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
