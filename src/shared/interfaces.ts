export interface IProduct {
    "pId": number;
    "pName": string;
    "pPrice": number;
    "pSize"?: Array<string>;
    "pImage": string;
}

export interface ITransaction {
    "tId":number;
    "tTotal":number;
    "transaction": Array<{
        "pId": number;
        "pName": string;
        "pPrice": number;
        "pSize"?: string;
        "pQty": number;
        "pTotal": number;
    }>;
  
}

export interface IUser{

    username:string;
    password:string;
 }