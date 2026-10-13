import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { Auth } from '../auth';

const Card = (props) => {
  const { string } = props;
  return (
    <>
      {/* Adicionado h-48 md:h-1/3 para garantir que os cards dividam o espaço igualmente sem quebrar */}
      <div className='card3 overflow-hidden h-48 md:h-1/3 w-full relative flex justify-center items-center rounded-2xl shadow-lg shadow-primary-navy-blue/30'>
        {/* Ajustado o container de texto interno para garantir centralização e leitura perfeita */}
        <div className='absolute inset-0 bg-primary-navy-blue/40 flex items-center justify-center p-4 z-10 rounded-2xl'>
          <h3 className='text-secondary-cream! font-bold text-center text-xl md:text-2xl font-subtitle tracking-wide'>
            {string}
          </h3>
        </div>
        {/* Imagem preenchendo o bloco do card de forma limpa */}
        <img className='img-card object-cover w-full h-full rounded-2xl' src='https://picsum.photos/1280/1280/' alt='card visual' />
      </div>
    </>
  );
};

const Homepage = () => {
  const navigate = useNavigate();
  const goToAuth = () => { navigate('/auth') }

  return (
    <>
      <section className='section bg-secondary-cream'>
        {/* Ajustado os paddings e alinhamentos gerais para conversar com as páginas Finance e Auth */}
        <div className='flex flex-col md:flex-row h-full w-full p-6 md:p-12 gap-8 items-center justify-center'>

          {/* COLUNA DA ESQUERDA: TEXTOS PRINCIPAIS E BOTÃO */}
          <div className='h-auto md:h-full w-full md:w-3/5 flex flex-col justify-center items-start gap-6'>
            <div className='flex flex-col gap-3 w-full text-left'>
              <h1 className='text-3xl! md:text-5xl! font-bbh-bartle! text-primary-navy-blue! leading-tight'>
                Your Personal Financial Advisor
              </h1>
              <h3 className='text-lg! md:text-xl! text-primary-navy-blue! opacity-90 font-medium'>
                ask away, your investments, budgeting, expenses
              </h3>
              <h3 className='text-lg! md:text-xl! text-primary-navy-blue! opacity-90 font-medium'>
                we know everything
              </h3>
            </div>
            
            {/* Alinhamento do botão com a fonte correta do seu tema corporativo */}
            <div className='w-full md:w-1/2 mt-4'>
              <button 
                className='btn w-full py-3 text-center font-bbh-bartle!' 
                onClick={goToAuth}
              >
                Get Started
              </button>
            </div>
          </div>

          {/* COLUNA DA DIREITA: CARDS INSPIRACIONAIS */}
          <div className='h-full w-full md:w-2/5 flex flex-col items-center justify-center gap-4 p-2'>
            <Card string='Manage Your Finances Today' />
            <Card string='The Best Way To Handle Your Money' />
          </div>

        </div>  
      </section>
      
      <section className='section bg-offwhite'>
      </section>
    </>
  );
};

export { Homepage, Card };
