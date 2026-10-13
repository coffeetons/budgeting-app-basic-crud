import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useGetUserInfo = () => {
    // Estado reativo que começa vazio e aguarda a resposta do Firebase
    const [userInfo, setUserInfo] = useState({ userId: null, isAuth: false });

    useEffect(() => {
        const authInstance = getAuth();
        
        // Escuta em tempo real o estado de login do seu componente Auth.jsx
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                // Usuário encontrado! Mapeia o ID correto para os outros componentes
                setUserInfo({
                    userId: user.uid,
                    isAuth: true
                });
            } else {
                // Usuário deslogado
                setUserInfo({
                    userId: null,
                    isAuth: false
                });
            }
        });

        // Limpa o listener ao desmontar o hook
        return () => unsubscribe();
    }, []);

    return userInfo;
};
