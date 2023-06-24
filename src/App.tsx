import { useEffect, useState } from 'react';

interface Movie {
    id: number;
    title: string;
    posterURL: string;
    imdbId: string;
}

export default function App() {
    const [rawMovieData, setRawMovieData] = useState<Movie[]>([]);
    const [moviesArray, setMoviesArray] = useState<Movie[]>([]);

    const getRawMovieData = async () => {
        const resp = await fetch('https://api.sampleapis.com/movies/classic');
        const json = await resp.json();
        setRawMovieData(json);
    };

    const generateMoviesArray = () => {
        const numbers: number[] = [];
        const movies: Movie[] = [];

        while (numbers.length < 25) {
            const number = Math.floor(Math.random() * 84) + 1;

            if (!numbers.includes(number)) {
                numbers.push(number);
            }
        }

        numbers.forEach((number) => {
            const targetMovie = rawMovieData.find(
                (movie) => movie.id === number
            );
            if (targetMovie !== undefined) {
                movies.push(targetMovie);
            }
        });

        setMoviesArray(movies);
    };

    useEffect(() => {
        const fetchData = async () => {
            await getRawMovieData();
        };
        fetchData();
        generateMoviesArray();
    }, []);

    return <div>{JSON.stringify(moviesArray)}</div>;
}
