import React, { useState, useEffect } from 'react';
import './Card.css';
import api from '../../services/apiReceitas';

export default function Card() {

  //Variavel useState receitas
  const [receitas, setReceitas] = useState([]);

  //Variavel useState carregamento
  const [loading, setLoading] = useState(true);

  //Variavel useState error
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const response = await api.get('doce');
        setReceitas(response.data);
        setLoading(false);
      } catch (error) {
        //resposta no console
        console.error("Não foi possível Encontrar as receitas!", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchReceitas();
  }, []);

  //Respondendo carregamento como elemento
  if (loading) {
    return <div>Carregando receitas...</div>;
  }

  //Respondendo erro como elemento
  if (error) {
    return <div>Ocorreu um erro ao carregar as receitas!</div>;
  }

  return (
    <div className='card'>

      {receitas.length > 0 ? (
        receitas.map((receita) => (
          //Card de receita
          <div key={receita._id}   className='card-receita'>

            <div className='info-receitas'>
              <h2>{receita.receita}</h2>
              {receita.link_imagem && (
                <img
                  src={receita.link_imagem}
                  alt={`Imagem de ${receita.receita}`}
                />
              )}
            </div>

            <div className='ingredientes-modoprep'>

            <div className='ingredientes'>
              <h3>Ingredientes:</h3>

              {/* criando um a array para verificar se tem ou não ingredientes */}
              {receita.ingredientes && Array.isArray(receita.ingredientes) ? (
                <ul>
                  {receita.ingredientes.map((ingrediente, index) => (
                    <li key={index}>{ingrediente}</li>
                  ))}
                </ul>)
                :
                //Se não encontrar receita
                (<p>{receita.ingredientes || 'Ingredientes não disponíveis.'}</p>

              )} {/*fechando array*/}
            </div>

            <div className='div-modo-preparo'>
              {receita.modo_preparo && (
                <div className='modo-preparo'>
                  <h3>Modo de Preparo:</h3>
                  <p>{receita.modo_preparo}</p>
                </div>)}
            </div>

          {/* fechamento do card de receita */}
            </div>
            </div>

        ))) : (
          <div>Nenhuma receita encontrada.</div>
        )}
    </div>
  );
}