import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const EditarLivro = () => {
    const { register, handleSubmit, setValue } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLivro = async () => {
            try {
                const response = await api.get(`/${id}`);
                setValue('title', response.data.title);
                setValue('description', response.data.description);
            } catch (error) {
                console.error('Erro ao buscar o livro:', error);
            }
        };
        fetchLivro();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await api.put(`/${id}`, data);
            console.log('Status:', response.status);
            navigate(`/livro/${id}`);
        } catch (error) {
            console.error('Erro ao editar o livro:', error); 
        }
    };

    return (
        <div className="container">
            <div className="title-container">
                <h1>Editar Livro</h1>
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
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default EditarLivro;
