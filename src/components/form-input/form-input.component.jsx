import React from "react";
import './form-input.styles.scss';


const FormInput=({label,...otherProps})=>{
    return(
        <div className="group">
            {label && (
                <React.Fragment>
                    <input 
                        className="form-input"
                        {...otherProps}
                    />                    
                    <label 
                        className={`${otherProps.value.length?'shrink':''} form-input-label`}
                    >
                        {label}
                    </label>
                </React.Fragment>
            )}
        </div>
    );
}

export default FormInput;