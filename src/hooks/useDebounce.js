import { useEffect, useState } from 'react';

export default function useDebounce(value, delay) {
    const [data, setData] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setData(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return data;
}
