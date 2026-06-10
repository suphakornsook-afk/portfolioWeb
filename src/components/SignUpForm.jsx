import {useState} from "react";

function SignupForm(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    function handleSubmit(event){

        event.preventDefault();
        alert('Submitted');
    }

    return (
        <div style={{ maxWidth: 400, margin: "2em auto" }}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div style ={{ marginButtom:"1rem"}}>
                    <label>
                        Email: 
                        <input type="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />

                    </label>
                </div>

                <div style ={{ marginButtom:"1rem"}}>
                    <label>
                        Password:
                        <input type="password" placeholder="********" />

                    </label>

                </div>

                <button type="submit" >Create account</button>
            </form>
        </div>
    )
}
export default SignupForm;