import React, { useState } from 'react';
import * as Recharts from 'recharts';

// IMPORTAÇÕES CORRIGIDAS: Subindo duas pastas (../../) para achar a raiz do src
import { useAddExpense } from '../../firebaseLogic';
import { useGetUserInfo } from '../../getUserInfo';
import { useGetExpenses } from '../../useGetExpenses';

const Finance = () => {
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [currency, setCurrency] = useState('BRL');
  const [category, setCategory] = useState('housing');

  // 1. Pega os dados do usuário atual de forma reativa
  const { userId } = useGetUserInfo();
  
  // 2. Puxa a função de adicionar despesa
  const { addExpense } = useAddExpense();
  
  // 3. Puxa a lista de despesas em tempo real baseada no usuário logado
  const { expenses } = useGetExpenses(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateObject = date ? new Date(`${date}-02`) : new Date();
    const cleanDate = dateObject.toISOString().split('T')[0];

    try {
        // Passa o userId dinâmico na hora do envio
        await addExpense({
            userId: userId,
            date: cleanDate,
            value: value,
            category: category,
            currency: currency
        });
        
        // Limpa apenas o campo de valor ao enviar com sucesso
        setValue('');
        console.log("Despesa enviada com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar:", error);
    }
  };

  // --- LÓGICA DO BOTÃO CLEAR ---
  // Reseta todos os campos do formulário para o estado inicial
  const handleClear = () => {
    setValue('');
    setDate('');
    setCategory('housing');
    setCurrency('BRL');
  };

  return (
    <>
    <section className='section bg-secondary-cream flex flex-col md:flex-row items-center justify-around p-4 gap-6 overflow-y-auto md:overflow-hidden'>
      
      {/* SEÇÃO DA ESQUERDA: FORMULÁRIO */}
      <div className='flex flex-col justify-center items-center w-full md:w-1/2'>
        <div className='flex flex-col items-center mb-6'>
          <h1 className='text-4xl! md:text-6xl! font-bbh-bartle! text-primary-navy-blue!'>Finance</h1>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 w-11/12 max-w-md'>
            <input 
              type="number" 
              step="0.01"
              placeholder='EX..: R\$24.22' 
              className='txtbox w-full text-primary-navy-blue'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
            
            <input 
              type="month" 
              className='txtbox w-full text-primary-navy-blue' 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            
            <div className='flex flex-row gap-2 w-full'>
                <select 
                  className='txtbox flex flex-2 text-primary-navy-blue' 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                    <option value="housing">Housing</option>
                    <option value="transportation">Transportation</option>
                    <option value="food">Food</option>
                    <option value="utilities">Utilities</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="personal-entertainment">Personal entertainment</option>
                    <option value="personal-investments">Personal Investments</option>
                </select>
                
                <select 
                  className='txtbox flex flex-1 text-primary-navy-blue' 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  required
                >
                    <option value="USD">USD</option>
                    <option value="BRL">BRL</option>
                </select>
            </div>
            
            <div className='flex flex-row gap-4 w-full mt-2'>
                <button type="submit" className='btn flex-2! font-bbh-bartle!'>SUBMIT</button>
                {/* Botão renomeado para CLEAR rodando a função de limpar os campos */}
                <button 
                  type="button" 
                  className='btn-hollow flex-1! font-bbh-bartle!' 
                  onClick={handleClear}
                >
                  CLEAR
                </button>
            </div>
        </form>
      </div>

      {/* SEÇÃO DA DIREITA: LISTA DE HISTÓRICO DE COMPRAS */}
      <div className='flex flex-col justify-start items-center w-full md:w-1/2 max-w-md gap-4 mt-6 md:mt-0'>
        <h3 className='text-2xl! font-bold text-primary-navy-blue! uppercase font-bbh-bartle! w-full text-center md:text-left'>History</h3>
        
        {/* Caixa de rolagem vertical para as compras não esticarem a página */}
        <div className='flex flex-col gap-2 w-full max-h-64 md:max-h-[400px] overflow-y-auto pr-1'>
          {expenses.map((expense) => (
            <div 
              key={expense.id} 
              className='flex flex-row justify-between items-center p-3 border rounded-md txtbox bg-bg-offwhite text-primary-navy-blue border-primary-navy-blue/20 w-full'
            >
              <div className='flex flex-col items-start text-left gap-0.5'>
                <span className='text-sm font-bold capitalize font-fira-sans'>{expense.category}</span>
                <span className='text-xs opacity-60 font-jetbrains-mono'>{expense.date}</span>
              </div>
              <span className='font-bold font-jetbrains-mono text-xl'>
                {expense.currency} {Number(expense.value).toFixed(2)}
              </span>
            </div>
          ))}
          
          {expenses.length === 0 && (
            <p className='text-sm text-primary-navy-blue opacity-50 text-center py-6 font-edu'>No purchases registered yet.</p>
          )}
        </div>
      </div>

    </section>
    </>
  );
};

export { Finance };
