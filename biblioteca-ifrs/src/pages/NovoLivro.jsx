import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const NovoLivro = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await api.post('/', data);
        navigate('/');
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
