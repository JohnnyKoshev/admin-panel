import axiosInstance from "../utils/axios";
import {AxiosResponse} from "axios";

export interface IUserData {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: 'male' | 'female';
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string; // or Date for a Date object
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    domain: string;
    ip: string;
    address: {
        address: string;
        city: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        postalCode: string;
        state: string;
    };
    macAddress: string;
    university: string;
    bank: {
        cardExpire: string;
        cardNumber: string;
        cardType: string;
        currency: string;
        iban: string;
    };
    company: {
        address: {
            address: string;
            city: string;
            coordinates: {
                lat: number;
                lng: number;
            };
            postalCode: string;
            state: string;
        };
        department: string;
        name: string;
        title: string;
    };
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: {
        coin: string;
        wallet: string;
        network: string;
    };
}

export type Optional<T> = {
    [P in keyof T]?: T[P];
};

interface ISignInService {
    login: (username: string, password: string) => Promise<AxiosResponse<any, any>>;
    getCurrentUser: () => Optional<IUserData>;
}

const SignInService: ISignInService = {
    login: async (username: string, password: string) => {
        return axiosInstance.post('/auth/login', {
            username,
            password,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('data') as string);
    }
}
export default SignInService;