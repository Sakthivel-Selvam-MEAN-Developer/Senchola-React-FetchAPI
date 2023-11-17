import { useEffect, useState } from 'react';
import './main.css';

const Main = () => {
    const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10';

    const [images, setImages] = useState([]);
    const [notGettingError, setNotGettingError] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) throw Error('Error: Data not Received');

                const result = await response.json();
                setImages(result);
            } catch (err) {
                setNotGettingError(true);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="container mt-5">
            <h3 className='mb-3 mt-3'>Cats</h3>
            {!notGettingError ? (
                images.length ? (
                    images.map((img) => (
                        <img className='rounded' src={img.url} alt="img" key={img.id} />
                    ))
                ) : (
                    <p>Loading...</p>
                )
            ) : (
                <p>Error: Data not Fetched</p>
            )}
        </div>
    );
};

export { Main };
