import { Profile } from './profile';

export interface User {
    id: string;
    email: string;
    password: string;
    confirmPassword: string;
    profile: Profile;
}

