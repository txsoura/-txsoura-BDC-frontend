import NavBar from './NavBar';

export const withNavBarLayout = (WrappedComponent, navbar = true) => {
    return props => {
        return (
            <>
                {navbar && <NavBar/>}
                <WrappedComponent {...props} />
            </>
        );
    };
}
