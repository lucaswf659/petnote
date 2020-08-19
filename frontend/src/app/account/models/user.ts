import { Profile } from './profile';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    //profile: Profile;
}

