import { useState } from "react";
import { auth } from "../../../firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { replace, useNavigate } from "react-router-dom";

export const Auth = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email)

    const Register = async (e) => {
        e.preventDefault();
        return await createUserWithEmailAndPassword(auth,email,password)
            .then(() => {
                console.log('userCreated');
                nav('/finance', {replace: true})
            });
    }

    const Login = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth,email, password)
            .then(() => {
                console.log('userloggedin');
                nav('/finance', {replace: true})
            });
    }

    const signIn = async (e) => {
        e.preventDefault();
        try{ await Register(e);} 
        catch (error) { console.log('trying login instead of register');
             try{ await Login(e) } 
             catch (error) {alert('deu merda' + error);
            }
        }
    }
    const logOff = async (e) => {
        try{await signOut(auth);} catch (err) {console.log(err); alert(err)}
    } 

    return(<>
        {/* Substituída a classe antiga 'bg-primary-navy-blue' pela sua nova estampa geométrica */}
        <section className="section bg-geometric-pattern h-dvh flex flex-col md:flex-row justify-center items-center">
            <div className="h-0 w-0"></div>
            
            {/* Login Card centralizado flutuando sobre o padrão geométrico */}
            <div className="login-card bg-ascent-baby-blue w-11/12 md:h-5/6 md:w-1/3 px-6 py-8 flex flex-col justify-center items-center text-center rounded-2xl shadow-xl shadow-primary-navy-blue/50">
                <form onSubmit={signIn} className="w-full">
                    <div className="flex flex-col justify-center w-full content-center gap-4">
                        
                        {/* Título de Email com cor Navy para dar contraste */}
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bbh-bartle! text-3xl! text-primary-navy-blue!">EMAIL</h1>
                            <input 
                              placeholder="EMAIL" 
                              type="email" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)}
                              className="txtbox w-full text-primary-navy-blue border-b-primary-navy-blue placeholder-primary-navy-blue/40"
                              required
                            />
                        </div>
                        
                        {/* Título de Senha */}
                        <div className="flex flex-col gap-2 mt-2">
                            <h1 className="font-bbh-bartle! text-3xl! text-primary-navy-blue!">PASSWORD</h1>
                            <input 
                              placeholder="PASSWORD" 
                              type="password" 
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)}  
                              className="txtbox w-full text-primary-navy-blue border-b-primary-navy-blue placeholder-primary-navy-blue/40"
                              required
                            />
                        </div>
                        
                        {/* Botões usando seus utilitários nativos e esticando na largura total */}
                        <div className="flex flex-col content-center justify-around pt-6 gap-4 w-full">
                            <button type="submit" className="btn w-full font-bbh-bartle!">LOGIN</button>
                            <button type="button" className="btn-hollow w-full font-bbh-bartle!" onClick={logOff}>SIGN OUT</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        </>)
}
