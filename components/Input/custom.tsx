import React, {InputHTMLAttributes, useEffect, useRef} from "react";
import {useField} from '@unform/core'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type?: string;
    defaultValue?: string;
    autoComplete?: string;
    labelClassName: string;
    className: string;
}

const Custom = ({name, label, className, labelClassName, ...rest}: Props) => {
    const inputRef = useRef(null)
    const {fieldName, defaultValue, registerField, error} = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])

    return (
        <>
            <label htmlFor={name}
                   className={labelClassName}>
                {label}
            </label>
            <input
                id={name}
                ref={inputRef}
                name={name}
                defaultValue={defaultValue}
                className={className}
                {...rest}
            />
            {error && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {error}
                </span>
            )}
        </>
    )
}

export default Custom;
