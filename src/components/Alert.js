import React, { useEffect } from 'react'

export const Alert = (props) => {
    useEffect(() => {
        console.log("Alert props:", props.alert);
    }, [props.alert]);
    const change = (word) =>{
        if (word == "danger"){
            word = "Error"
        }
        if (word == 'success'){
            word = "Success"
        }
        return word
    }
    return (
        <div>
            {props.alert && props.alert.msg && (
                <div className={`alert alert-${props.alert.type} fade show`} role="alert">
                    <strong>{change(props.alert.type)}</strong>: {props.alert.msg}
                </div>
            )}

        </div>
    )
}
