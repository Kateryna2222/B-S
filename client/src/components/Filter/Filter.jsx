import './Filter.scss';

const Filter = ({params, onChange, onApply, onReset}) => {
    const stateOptions = [
        { value: "new", label: "Нове" },
        { value: "used", label: "Б/В" }
    ];

    return (
        <div className='filterWrapper'>
            <div className="filter">
                <p>Ціна</p>
                <div className="price">
                    <div>
                        <span>Мінімальна</span>
                        <input type="number" placeholder="Min" value={params.minPrice}
                            onChange={(e) => onChange("minPrice", Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <span>Максимальна</span>
                        <input type="number" placeholder="Max" value={params.maxPrice}
                            onChange={(e) => onChange("maxPrice", Number(e.target.value))}
                        />
                    </div>
                </div>
                <select value={params.state} onChange={(e) => onChange("state", e.target.value)}>
                    <option value="" disabled>Стан</option>
                    {stateOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                        {opt.label}
                        </option>
                    ))}
                </select>
                <div className="btns">
                    <button onClick={onApply}>
                        Застосувати фільтри
                    </button>
                    <button onClick={onReset}>
                        Скинути фільтри
                    </button>
                </div>
            </div>
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
        </div>
    );
};

export default Filter;

