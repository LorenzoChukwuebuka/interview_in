import React, { useEffect, useState } from 'react';
import './App.css';
import useStore, { Country } from './store/store';
import useDebounce from './hooks/debounce';

function App() {
    const { getCountries, countries, searchCountries, pagination, nextPage, prevPage } = useStore();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms delay

    useEffect(() => {
        getCountries();
    }, [getCountries]);

    useEffect(() => {
        if (debouncedSearchQuery !== "") {
            searchCountries(debouncedSearchQuery);
        } else {
            getCountries(); // Reset to initial state when search query is empty
        }
    }, [debouncedSearchQuery, searchCountries, getCountries]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className='p-5'>
            <div className='mt-5 mb-5'>
                <input
                    type='text'
                    className='border-solid border-black border p-2'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <table className="md:min-w-5xl min-w-full w-full rounded-sm bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Code
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {countries && countries.length > 0 ? (
                        countries.map((country: Country, index: number) => (
                            <tr key={index}>
                                <td className="py-4 px-4">{country.name}</td>
                                <td className="py-4 px-4">{country.code}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} className="py-4 px-4 text-center">No countries found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={prevPage}
                    disabled={!pagination.hasPreviousPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span>
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                    onClick={nextPage}
                    disabled={!pagination.hasNextPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;