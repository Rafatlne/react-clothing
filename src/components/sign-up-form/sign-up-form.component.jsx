import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit  = async (event) => {
        event.preventDefault()

        if(password !== confirmPassword) {
            alert("password doestnt match")
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields()
        } catch (error) {
            if(error.code === "auth/email-already-in-use") {
                alert("email already exists")
            }
            console.log("user creation gives error", error.message)
        }
    }

    return  (
        <div className="sign-up-container">
            <h1>Don't Have Account?</h1>
            <span>Sign Up With Your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={"Display Name"} type="text" onChange={handleChange} required name="displayName" value={displayName}/>
                <FormInput label={"Email"} type="email" onChange={handleChange} required name="email" value={email}/>
                <FormInput label={"Password"} type="password" onChange={handleChange} required name="password" value={password}/>
                <FormInput label={"Confirm Password"} type="password" onChange={handleChange} required name="confirmPassword" value={confirmPassword}/>

                <Button buttonType="inverted" children="Sign Up" type="submit"/>
            </form>
        </div>
    )
}

export default SignUpForm;