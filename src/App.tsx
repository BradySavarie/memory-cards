import { useEffect, useState } from 'react';

interface Movie {
    id: number;
    title: string;
    posterURL: string;
    imdbId: string;
}

export default function App() {
    const [moviesArray, setMoviesArray] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getMovieData = async () => {
        const resp = await fetch('https://api.sampleapis.com/movies/classic');
        const json = await resp.json();
        generateMoviesArray(json);
    };

    const generateMoviesArray = (data: Movie[]) => {
        const numbers: number[] = [];
        const movies: Movie[] = [];

        while (numbers.length < 25) {
            const number = Math.floor(Math.random() * 84) + 1;

            if (!numbers.includes(number)) {
                numbers.push(number);
            }
        }

        numbers.forEach((number) => {
            const targetMovie = data.find((movie) => movie.id === number);
            if (targetMovie !== undefined) {
                movies.push(targetMovie);
            }
        });

        setMoviesArray(movies);
    };

    useEffect(() => {
        getMovieData();
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return <div>{JSON.stringify(moviesArray)}</div>;
}
