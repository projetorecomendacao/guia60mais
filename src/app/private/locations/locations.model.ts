export interface Location {
    id?: number;
    name?: string;
    communication: {
        email?: string;
        telefone?: string;
        fax?: string;
    };
    parking?: string;
    address: {
        address: string;
        number: string;
        district?: string;
        cep: string;
        city: string;
        state: string;
        country: string;
        latitude?: number;
        longitude?: number;
    };
    institution: {
        id?: number,
        company_name: string
    };
    contact_people: {
        id?: number,
        email: string
    }[];
    technical_manager: {
        id: number,
        email: string
    }[];
}