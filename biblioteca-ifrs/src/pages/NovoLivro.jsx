import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const NovoLivro = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await api.post('/', data);
            console.log('Status:', response.status); // Imprime o status no console
            navigate('/'); // Navega para a página inicial após o sucesso
        } catch (error) {
            console.error('Erro ao adicionar o livro:', error); // Trata erros e imprime no console
        }
    };

    return (
        <div className="container">
            <div className="title-container">
                <h1>Adicionar Novo Livro</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Título:</label>
                    <input {...register('title', { required: true })} />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea {...register('description', { required: true })}></textarea>
                </div>
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default NovoLivro;
