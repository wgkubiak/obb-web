import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { StyledEditExamInput, StyledFormLabel, StyledFormControl, StyledHeaderH2 } from "./../Styles";

const LoginScreen = props => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const style = { 
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3)", 
        width: "auto", 
        padding: "1em", 
        height: "auto", 
        position: "absolute", 
        left: "50%", 
        top: "40%", 
        transform: "translate(-50%, -50%)", 
        backgroundColor: "#424242",
        paddingTop: "0"
    };

    return (
        <div style={style}>
            <StyledHeaderH2 style={{marginBottom: "0.5em"}}>Zaloguj</StyledHeaderH2>
            <StyledEditExamInput style={{ width: "100%", margin: "0", padding: "1em"  }}>
                <StyledFormLabel>Login</StyledFormLabel>
                <StyledFormControl
                    type="text"
                    placeholder="Wprowadź login"
                    onChange={(event) => setLogin(event.target.value)}
                />
            </StyledEditExamInput>
            <StyledEditExamInput style={{ width: "100%", margin: "0", padding: "1em" }}>
                <StyledFormLabel>Hasło</StyledFormLabel>
                <StyledFormControl
                    type="password"
                    placeholder="Wprowadź hasło"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </StyledEditExamInput>
            <Button variant="success" style={{ marginTop: "1em" }} onClick={() => props.loginHandler()}>Login</Button>
        </div>
    )
}

export default LoginScreen;