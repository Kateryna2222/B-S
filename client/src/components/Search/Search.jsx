import { useState } from 'react';

const Search = ({ onSearch }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value);
    };

    return (
        <search>
            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    name="q"
                    placeholder="Що шукаєте?"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit">Пошук</button>
            </form>
        </search>
    );
};

export default Search;