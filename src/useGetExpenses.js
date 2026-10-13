import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase"; // Ajuste o caminho se necessário

export const useGetExpenses = (userId) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        // Se não tiver userId ainda, não tenta ler nada
        if (!userId) return;

        // Aponta para a subcoleção de despesas do usuário logado
        const expenseCollectionRef = collection(db, "users", userId, "expenses");
        
        // Ordena para mostrar as mais recentes primeiro
        const q = query(expenseCollectionRef, orderBy("createdAt", "desc"));

        // O onSnapshot funciona exatamente como o onValue da documentação do Firebase
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const expensesList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setExpenses(expensesList);
        });

        // Cancela a inscrição quando o componente fecha
        return () => unsubscribe();
    }, [userId]);

    return { expenses };
};
