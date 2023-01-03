import { useState } from "react";

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


import './sign-in-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    const handleSubmit  = async (event) => {
        event.preventDefault()

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields()
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert("Wrong Password");
                    break;
                case 'auth/user-not-found':
                    alert("user not found");
                    break;
                default:
                    console.log(error);
            }
            console.log("user creation gives error", error.message)
        }
    }

    return  (
        <div className="sign-up-container">
            <h1>Already Have an Account?</h1>
            <span>Sign in With Your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={"Email"} type="email" onChange={handleChange} required name="email" value={email}/>
                <FormInput label={"Password"} type="password" onChange={handleChange} required name="password" value={password}/>
                <div className="buttons-container">
                <Button buttonType="inverted" children="Sign In" type="submit"/>
                <Button type="button" buttonType="google" children="Google Sign In" onClick={signInWithGoogle}/>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;