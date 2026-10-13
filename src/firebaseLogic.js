import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const useAddExpense = () => {
    // Agora a função recebe o userId dinamicamente de onde ela é chamada
    const addExpense = async ({ userId, date, value, category, currency }) => {
        
        if (!userId) {
            console.error("Não foi possível enviar: userId está faltando.");
            return;
        }

        // Utiliza o userId da variável em vez do texto fixo
        const expenseCollectionReference = collection(db, "users", userId, "expenses"); 
        
        await addDoc(expenseCollectionReference, {
            userId: userId,
            date,
            value: Number(value),
            category,
            currency,
            createdAt: serverTimestamp()
        });
        
        console.log("Enviado com sucesso para o Firestore!");
    };
    
    return { addExpense };
};
