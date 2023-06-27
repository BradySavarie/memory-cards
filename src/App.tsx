import { useEffect, useState } from 'react';
import _ from 'lodash';
import Scorecard from './components/Scorecard';
import Timer from './components/Timer';
import RoundIndicator from './components/RoundIndicator';
import Card from './components/Card';

export interface Movie {
    id: number;
    title: string;
    posterURL: string;
    imdbId: string;
}

export default function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [round, setRound] = useState<number>(1);
    const [currentRoundMovies, setCurrentRoundMovies] = useState<Movie[]>([]);
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [bestScore, setBestScore] = useState<number>(0);
    const [roundPoints, setRoundPoints] = useState<number>(0);
    const [currentlySelectedMovies, setCurrentlySelectedMovies] = useState<
        Movie[]
    >([]);
    const [gameOver, setGameOver] = useState<boolean>(false);

    const getMovieData = async () => {
        const resp = await fetch('https://api.sampleapis.com/movies/classic');
        const json = await resp.json();
        const cleanData = await cleanMoviesData(json);
        generateMoviesArray(cleanData);
        setIsLoading(false);
    };

    const cleanMoviesData = async (data: Movie[]) => {
        const cleanedData: Movie[] = [];

        const loadImage = (url: string): Promise<boolean> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve(true);
                img.onerror = () => reject(false);
            });
        };

        for (const movie of data) {
            try {
                await loadImage(movie.posterURL);
                cleanedData.push(movie);
            } catch (error) {
                console.error(
                    `Failed to load image for movie with ID ${movie.id}`
                );
            }
        }

        return cleanedData;
    };

    const generateMoviesArray = (data: Movie[]) => {
        const numbers: number[] = [];
        const movies: Movie[] = [];

        for (let i = 1; i <= data.length; i++) {
            numbers.push(i);
        }
        const shuffledNumbers = _.shuffle(numbers);

        for (let i = 0; i < shuffledNumbers.length && movies.length < 26; i++) {
            const number = shuffledNumbers[i];
            const targetMovie = data.find((movie) => movie.id === number);
            if (targetMovie !== undefined) {
                movies.push(targetMovie);
            }
        }

        getCurrentRoundMovies(movies);
    };

    const getCurrentRoundMovies = (movies: Movie[]) => {
        const currentCards: Movie[] = [];

        for (let i = 0; i <= round; i++) {
            currentCards.push(movies[i]);
        }

        setCurrentRoundMovies(currentCards);
    };

    const selectMovie = (selection: Movie) => {
        const containsSelection = currentlySelectedMovies.some(
            (movie) => movie.id === selection.id
        );
        if (containsSelection === false) {
            setCurrentlySelectedMovies((prevState: Movie[]) => [
                ...prevState,
                selection,
            ]);
        } else {
            setGameOver(true);
        }
    };

    const incrementRound = () => {
        if (round < currentlySelectedMovies.length) {
            setRound((prevState) => prevState + 1);
            console.log('round incremented');
        }
    };

    useEffect(() => {
        getMovieData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (gameOver === true) {
            console.log('game over');
        }
        incrementRound();
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Scorecard
                currentScore={currentScore}
                bestScore={bestScore}
            ></Scorecard>
            <RoundIndicator round={round} />
            {currentRoundMovies.map((movie) => (
                <div key={movie.id}>
                    <Card selectMovie={selectMovie} movie={movie} />
                </div>
            ))}
        </>
    );
}
