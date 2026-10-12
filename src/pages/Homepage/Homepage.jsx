import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { Auth } from '../auth';

const Card = (props) =>
{
  const {string} = props;
          return(<>
          <div className='card3 overflow-auto'>
            <div className='absolute top-4 left-0 pl-3 flex flex-col h-max items-center content-center w-full z-10'>
            <h3 className='text-secondary-cream! flex h-max  justify-center content-center font-bold md:py-2 md:px-4 md:my-2 md:h-1/2'>{string} </h3>
           
            </div>
          <img className='img-card' src='https://picsum.photos/1280/1280/' ></img>
        </div>
          </>
          )
}



const Homepage = () => {
  const navigate = useNavigate();
  const goToAuth = () => {navigate('/auth')}

  return (<>
    <section className='section'>
      
      <div className='flex flex-col md:flex-row h-full w-full p-2 bg-secondary-cream'>

       <div className='h-auto gap-6 md:gap-0 md:h-full md:w-3/4 w-full flex flex-col justify-center content-center md:items-center md:justify-around pr-2 mr-3 ml-0 '>
        <div className='h-1/2 w-full flex flex-col mx-4 md:ml-7.5 mt-8 justify-center content-center '>
          <h1 className='text-2xl! md:text-4xl! font-bbh-bartle! text-primary-navy-blue!'>Your Personal Financial Advisor</h1>
            <h3 className='md:ml-2 text-xl!  text-primary-navy-blue!'>ask away, your investments, budgeting, expenses</h3>
            <h3 className='md:ml-2 text-xl!  text-primary-navy-blue!'>we know everything</h3>
        </div>
        <div className='h-auto md:h-full md:w-3/4 w-full flex justify-around columns-2 content-around pt-4 md:justify-start md:items-start pr-2 mr-3 ml-0 '>
          <button className='btn md:h-auto md:w-full w-1/2 py-2 font-jetbrains-mono' onClick={goToAuth}>Get Started </button>
        
        </div>
       </div>

       <div className='h-full w-auto md:w-full md:max-w-1/2 flex flex-col items-center justify-around px-2 py-3 md:mx-4'>
          <Card string='Manage Your Finances Today'/>
          <Card string='The Best Way To Handle Your Money'/>
       </div>

      </div>  
    </section>
    <section className='section bg-offwhite'>
    </section>
  </>
  )
}

export {Homepage, Card}