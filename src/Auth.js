import React,{useState} from 'react';
import  'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';

const Auth = () => {
    const [correo, setCorreo] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);

    const user = useUser();
    const firebase = useFirebaseApp();


    const resetForm = () => {
        setPass('');
        setCorreo('');
        setError(null);
    }

    const handleRegister =  async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(correo, pass);
            resetForm();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleLogin = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(correo, pass);
            resetForm();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleLogout = async () => { 
        try {
            await firebase.auth().signOut();
            
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='login'>
           {user.data && <p> usuario: {user.data.email}</p> }
            { !user.data &&
                
           <div>
                <div>
                    <input value={correo} onChange={(e)=>setCorreo(e.target.value)} placeholder="Correo" type="email" />
                </div>
                <div>
                    <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Pass" type="password" />
                </div>
                <div>
                    <button onClick={handleRegister}>Registrarte</button>
                    <button onClick={handleLogin}>Iniciar session</button>
                </div>
                {error && 
                    <div className="error">
                        {error}
                    </div>
                }
           </div> 
            }

            {user.data && <button onClick={handleLogout}>Cerrar session</button>}
        </div>
    )
}


export default Auth;
