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
            const response = await api.get(`/${id}`);
            setValue('title', response.data.title);
            setValue('description', response.data.description);
        };
        fetchLivro();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        await api.put(`/${id}`, data);
        navigate(`/livro/${id}`);
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
