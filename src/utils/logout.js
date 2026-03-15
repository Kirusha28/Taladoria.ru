import Cookies from 'js-cookie';
import { setUser } from '../store/slices/accountData';
import { initialStateUser } from '../constants/initialUser';

export const handleLogout = (dispatch) => {
    // 1. Удаляем куку
    Cookies.remove('token');
    // 2. Сбрасываем Redux до начального состояния
    dispatch(setUser(initialStateUser));
    // 3. (Опционально) Редирект на логин
    window.location.href = '/login';
};