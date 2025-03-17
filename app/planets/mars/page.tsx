
import { useState } from 'react';

export default function Page() {
    const [number, setNumber] = useState<number | null>(null);

    const fetchRandomNumber = async () => {
        const response = await fetch('/api/randomNumber');
        const data = await response.json();
        setNumber(data.number);
    };

    return (
        <div>
            <div>mars</div>
            <div>Random Number: {number !== null ? number : 1}</div>
            <button onClick={fetchRandomNumber}>Update</button>
        </div>
    );
}