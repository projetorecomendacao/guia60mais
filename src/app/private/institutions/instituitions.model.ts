export interface Institution {
    id: number;
    company_name: string;
    fantasy_name: string;
    cnpj: string;
    goal?: string;
    aimed_people: string;
    aimed_people_age: number;
    capacity_free?: number;
    capacity_free_m?: number;
    capacity_free_f?: number;
    capacity_used?: number;
    capacity_used_m?: number;
    capacity_used_f?: number;
    contato: {
        email: string;
        telefone: string;
        fax?: string;
    };
    address: {
        address: string;
        number: string;
        district: string;
        cep: string;
        city: string;
        state: string;
        country: string;
        latitude?: number;
        longitude?: number;
    };
    contact_people?: {
        id?: number,
        email?: string
    }[];
    technical_manager?: {
        id?: number,
        email?: string
    }[];
    legal_nature?: string;
    note?: string;
}

// export interface Institution {
//     CompanyName: string,
//     CompanyFancyName: string,
//     CNPJ: string,
//     Objective: string,
//     TargetAudience: string,
//     AgeTargetAudience: string,
//     Comments: string,
//     ContactMeans: string,
//     Address: string,
//     WebAddress: string
// }