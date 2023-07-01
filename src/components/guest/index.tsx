import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';

interface GuestProps {
  children: ReactNode;
}

export const Guest: FC<GuestProps> = (props) => {
  const { children } = props;
  const auth = useAuth();
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // if (!router) {
    //   return;
    // }

    if (auth.isAuthenticated) {
      router.push('/dashboard');
    } else {
      setVerified(true);
    }
  }, []);

//   if (!verified) {
//     return null;
//   }

  return <>{children}</>;
};

Guest.propTypes = {
  children: PropTypes.node
};
