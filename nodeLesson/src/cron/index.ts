import { getNewUsers } from './getNewUsers.cron';

export const cronRun = () => {
    console.log('CRONE HAS STARTED');

    getNewUsers();
};
