import React, {useCallback, useRef} from "react";
import {FormHandles, SubmitHandler} from "@unform/core";
import {isNull} from "underscore";
import {Form} from '@unform/web'
import {useRouter} from "next/router";
import {toast} from 'tailwind-toast'

import {UserProps} from "/types/user";
import userCreateSchema from "/schemas/userCreate";
import {serviceAPI} from "/services/api";
import Header from '/components/Header'
import Input from '/components/Input'
import Select from '/components/Select'
import {withNavBarLayout} from '/components/withNavBarLayout';
import getErrors from "/utils/getErrors";
import getApiError from "/utils/isApiError";

const Index = () => {
    const formRef = useRef<FormHandles>(null);
    const router = useRouter();

    const roleOptions = [
        {value: 'admin', label: "Admin"},
        {value: 'user', label: "Usuário"}
    ]

    const create: SubmitHandler<UserProps> = useCallback(
        async (data) => {
            try {
                formRef.current.setErrors({});
                await userCreateSchema.validate(data, {abortEarly: false});

                const response = await serviceAPI.post(
                    "contructions", data
                );

                toast().success("Wow!", response.data ? response.data.message : 'Criado')
                    .with({
                        duration: 4000,
                        speed: 1000,
                        positionX: 'end',
                        positionY: 'top',
                        color: "bg-green-600",
                        fontColor: "black",
                        fontTone: 300
                    }).show()

                await router.push('/contructions')
            } catch (error) {
                const errors = getErrors(error);

                if (!isNull(errors)) {
                    formRef.current.setErrors(errors);
                }

                const {isApi, error: apiError, message} = getApiError(error);

                if (isApi) {
                    toast().danger("Ops!", apiError ? apiError : message)
                        .with({
                            duration: 4000,
                            speed: 1000,
                            positionX: 'end',
                            positionY: 'top',
                            color: "bg-red-600",
                            fontColor: "black",
                            fontTone: 300
                        }).show()
                }
            }
        },
        [],
    );

    return (
        <>
            <Header title='Contrução'/>

            <div className="mt-10 sm:mt-1">
                <div className="md:grid md:grid-cols-1 md:gap-6">
                    <div className="flex justify-center mt-5 md:mt-0 md:col-span-2">
                        <Form ref={formRef} onSubmit={create}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <Input name='name' label='Nome' type="text"
                                                   autoComplete="name" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <Input name='budget' label='valor' type="text" autoComplete="email"/>
                                        </div>


                                        {/*<div className="col-span-6 sm:col-span-3">*/}
                                        {/*    <Select name='role' label='Cargo'*/}
                                        {/*            options={roleOptions}/>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <a href="/contructions"
                                       className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 mr-3"
                                    >
                                        Cancelar
                                    </a>

                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withNavBarLayout(Index)
