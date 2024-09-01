import { create } from "zustand";
import axios from 'axios';

export type Country = { name: string; code: string };

type PaginationInfo = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

type ApiResponse = {
    status: string;
    payload: {
        items: Country[];
        pagination: PaginationInfo;
    };
    message: string;
};

type Store = {
    countries: Country[];
    pagination: PaginationInfo;
    query: string;
    setCountries: (newCountries: Country[]) => void;
    getCountries: (query?: string, page?: number) => Promise<void>;
    searchCountries: (query: string) => Promise<void>;
    nextPage: () => Promise<void>;
    prevPage: () => Promise<void>;
};

const useStore = create<Store>((set, get) => ({
    countries: [],
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false,
    },
    query: '',
    setCountries: (newCountries) => set({ countries: newCountries }),
    getCountries: async (query = '', page = 1) => {
        try {
            const response = await axios.get<ApiResponse>(
                'http://localhost:5000/api/country',
                {
                    params: {
                        query: query || undefined,
                        limit: 10,
                        page: page
                    }
                }
            );
            set({
                countries: response.data.payload.items,
                pagination: response.data.payload.pagination,
                query
            });
        } catch (error) {
            console.error(error);
        }
    },
    searchCountries: async (query) => {
        await get().getCountries(query, 1);
    },
    nextPage: async () => {
        const { pagination, query } = get();
        if (pagination.hasNextPage) {
            await get().getCountries(query, pagination.currentPage + 1);
        }
    },
    prevPage: async () => {
        const { pagination, query } = get();
        if (pagination.hasPreviousPage) {
            await get().getCountries(query, pagination.currentPage - 1);
        }
    }
}));

export default useStore;