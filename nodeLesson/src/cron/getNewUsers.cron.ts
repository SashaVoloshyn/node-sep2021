import cron from 'node-cron';

import { userRepository } from '../repositories';

export const getNewUsers = () => {
    cron.schedule('* 10 05 * * *', async () => {
        console.log('NEW USERS :::');

        const users = await userRepository.getNewUsers();
        console.log(users);
    });
};
