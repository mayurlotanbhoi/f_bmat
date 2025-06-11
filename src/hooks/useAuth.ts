import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

export const useAuth = () => {
    return useSelector((state: RootState) => state.user);
};