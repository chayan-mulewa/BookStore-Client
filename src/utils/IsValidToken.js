import { Server } from '../config/index';
import axios from 'axios';

const IsValidToken = async () => {
    try {
        if (document.cookie) {
            const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

            const response = await axios.get(Server.authURL + '/validateToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            return response.status === 200;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default IsValidToken;
