import { useState } from "react";
import { auth } from "../../../firebase"
import {createUserWithEmailAndPassword, signOut} from 'firebase/auth'
export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email)

    const signIn = async (e) => {
        e.preventDefault();
        try{ await createUserWithEmailAndPassword(auth, email, password); alert('user criado')} 
        catch (error) { alert('deu merda'); console.log()
        }
    }
    const logOff = async (e) => {
        try{await signOut(auth);} catch (err) {console.log(err); alert(err)}
    }

    return(<>
        <section className="section bg-primary-navy-blue h-dvh">
            <div className="login-card bg-ascent-baby-blue h-1/2 w-3/4 flex flex-col items-center text-center rounded-2xl">
                <form onSubmit={signIn}>
                    <div className="flex flex-col justify-center w-full content-center">
                        <p>login</p>
                        <input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                         className="text-center border-wid border-b-2 border-b-bg-offwhite "></input>
                        <p className="font-subtitle">senha</p>
                        <input placeholder="senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <div className="flex flex-col py-2 gap-6">
                            <button type="submit" className="btn-hollow">Login</button>
                            <button type="button" className="btn-hollow" onClick={logOff}>Sign Out</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        </>)
}



