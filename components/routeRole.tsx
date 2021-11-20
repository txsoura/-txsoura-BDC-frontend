import {useAuth} from "/hooks/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";

export const routeRole = (WrappedComponent, role: string = "user") => {
    return props => {
        const {user} = useAuth();
        const {push} = useRouter();

        useEffect(() => {
            if (user && user.role !== role) {

                switch (user.role) {
                    case "admin" :
                        push('/admin')
                        break

                    case "user":
                        push('/dashboard')
                        break
                }
            }
        }, [push, user]);

        if (!user) {
            return <strong>Aguarde ...</strong>
        }

        return <WrappedComponent {...props} />;
    }
}
