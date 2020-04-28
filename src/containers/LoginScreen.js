import React, { useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import { StyledEditExamInput, StyledFormLabel, StyledFormControl, StyledHeaderH2 } from "./../Styles";

const LoginScreen = props => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const data = useMemo(
        () => ({
            username: login,
            password: password
        }),
        [login, password]
    );

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


    // const submitHandler = (event) => {
    //     event.preventDefault();

    //     fetch(`http://obb-api.herokuapp.com/register`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log("Success:", data);
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });

    //     setTimeout(() => {
    //         props.loginHandler();
    //     }, 500);
    // };

    const submitLoginHandler = (event) => {
        event.preventDefault();

        fetch(`http://obb-api.herokuapp.com/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.token) {
                  localStorage.setItem("token", data.token);
                  props.loginHandler();
                } else {
                  alert("Złe dane")
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }


    return (
        <div style={style}>
            <StyledHeaderH2 style={{ marginBottom: "0.5em" }}>Zaloguj</StyledHeaderH2>
            <StyledEditExamInput style={{ width: "100%", margin: "0", padding: "1em" }}>
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
            {/* <Button variant="success" style={{ marginTop: "1em" }} onClick={submitHandler}>Stwórz</Button> */}
            <Button variant="success" style={{ marginTop: "1em" }} onClick={submitLoginHandler}>Loguj</Button>
        </div>
    )
}

export default LoginScreen;