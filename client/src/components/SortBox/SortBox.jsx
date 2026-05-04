const SortBox = ({params, onChange}) => {
    return (
        <select className='sort'
                value={`${params.sortBy}-${params.sortDir}`}
                onChange={(e) => {
                    const [sortBy, sortDir] = e.target.value.split('-');
                    onChange("sortBy", sortBy);
                    onChange("sortDir", sortDir);
                }}
            >
            <option value="price-asc">Спочатку дешевші</option>
            <option value="price-desc">Спочатку дорожчі</option>
            <option value="createdAt-desc">Спочатку новіші</option>
            <option value="createdAt-asc">Спочатку старіші</option>
        </select>
    );
};

export default SortBox;