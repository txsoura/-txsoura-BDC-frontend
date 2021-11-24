import { AuthProvider } from './auth';
import { LoadingProvider } from './loading';

const HooksProvider = ({ children }) => {
  return (
    <LoadingProvider>
      <AuthProvider>{children}</AuthProvider>
    </LoadingProvider>
  );
};

export default HooksProvider;
