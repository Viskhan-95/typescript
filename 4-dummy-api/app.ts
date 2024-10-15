import axios, { AxiosResponse } from 'axios';

enum RequestStatus {
    Success = 'Success',
    Error = 'Error',
}

enum Gender {
    Female = 'female',
    Male = 'male',
}

enum BloodGroup {
    A_Positive = "A+",
    A_Negative = "A-",
    B_Positive = "B+",
    B_Negative = "B-",
    AB_Positive = "AB+",
    AB_Negative = "AB-",
    O_Positive = "O+",
    O_Negative = "O-"
}

enum Role {
    Admin = 'admin',
    User = 'user',
    Moderator = 'moderator',
}

interface IHair {
    color: string,
    type: string,
}

interface ICoordinates {
    lat: number,
    lng: number
}

interface iAddress {
    address: string,
    city: string,
    state: string,
    stateCode: string,
    postalCode: string,
    coordinates:ICoordinates,
    country: string

}

interface IBank {
    cardExpire: string,
    cardNumber: string,
    cardType: string,
    currency: string,
    iban: string,
}

interface ICompany {
    department: string,
    name: string,
    title: string,
    address: iAddress,
  }

interface ICrypto {
    coin: string,
    wallet: string,
    network: string
}

interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: Gender,
    email: string,
    phone: string,
    username: string,
    password: string,
    birthDate: string,
    image: string,
    bloodGroup: BloodGroup,
    height: number,
    weight: number,
    eyeColor: string,
    hair: IHair,
    ip: string,
    address: iAddress,
    macAddress: string,
    university: string,
    bank: IBank,
    company: ICompany,
    ein: string,
    ssn: string,
    userAgent: string,
    crypto: ICrypto,
    role: Role

}

async function getUsers(): Promise<IUser[]> {
    try {
        const response = await axios.get<{users: IUser[]}>('https://dummyjson.com/users');
        return response.data.users; 
    } catch (error) {
        console.log(RequestStatus.Error)
        throw error; 
    }
}

async function getUserById(userId: number): Promise<IUser> {
    try {
        const response: AxiosResponse<IUser> = await axios.get(`https://dummyjson.com/users/${userId}`);
        return response.data; 
    } catch (error) {
        console.log(RequestStatus.Error);
        throw error; 
    }
}

getUsers().then(user => {
    console.log(RequestStatus.Success)
    console.log(user);
});

getUserById(1).then(user => {
    console.log(RequestStatus.Success)
    console.log(user);
});