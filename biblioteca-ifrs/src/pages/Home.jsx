import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
    const [livros, setLivros] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [livrosPorPagina] = useState(10);

    const fetchLivros = async () => {
        const response = await api.get('/');
        setLivros(response.data);
    };

    useEffect(() => {
        fetchLivros();
    }, []);

    const totalLivros = livros.length;
    const indexOfLastLivro = currentPage * livrosPorPagina;
    const indexOfFirstLivro = indexOfLastLivro - livrosPorPagina;
    const currentLivros = livros.slice(indexOfFirstLivro, indexOfLastLivro);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(totalLivros / livrosPorPagina);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i <= 5 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            pageNumbers.push(i);
        }
    }

    return (
        <div className="container">
            <div className="title-container">
                <h1>Listagem de Livros</h1>
                <Link to="/novo">
                    <button style={{ float: 'right' }}>Adicionar</button>
                </Link>
            </div>
            <div className="livros-container">
                {currentLivros.map((livro) => (
                    <div key={livro.id} className="livro-item">
                        <Link to={`/livro/${livro.id}`}>{livro.title}</Link>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                {pageNumbers.map((number) => (
                    <button key={number} onClick={() => paginate(number)}>
                        {number}
                    </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próximo
                </button>
            </div>
        </div>
    );
};

export default Home;
