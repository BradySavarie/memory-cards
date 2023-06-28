import { useEffect, useState } from 'react';
import _ from 'lodash';
import Scorecard from './components/Scorecard';
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
    const [cleanMovieData, setCleanMovieData] = useState<Movie[]>([]);
    const [currentGameMovies, setCurrentGameMovies] = useState<Movie[]>([]);
    const [currentRoundMovies, setCurrentRoundMovies] = useState<Movie[]>([]);
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [bestScore, setBestScore] = useState<number>(0);
    const [currentlySelectedMovies, setCurrentlySelectedMovies] = useState<
        Movie[]
    >([]);
    const [gameOver, setGameOver] = useState<boolean>(false);

    const initMovieData = async () => {
        const resp = await fetch('https://api.sampleapis.com/movies/classic');
        const json = await resp.json();
        const cleanData = await cleanMoviesData(json);
        setCleanMovieData(cleanData);
        getCurrentGameMovies(cleanData);
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
                /* errors expected due to api containing broken urls */
            }
        }

        return cleanedData;
    };

    const getCurrentGameMovies = (data: Movie[]) => {
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
        setCurrentGameMovies(movies);
        getCurrentRoundMovies(movies);
    };

    const getCurrentRoundMovies = (movies: Movie[]) => {
        const currentMovies: Movie[] = [];

        for (let i = 0; i <= round; i++) {
            currentMovies.push(movies[i]);
        }

        setCurrentRoundMovies(currentMovies);
    };

    const handleSelection = (movie: Movie) => {
        selectMovie(movie);
        randomizeCurrentRoundMovies();
        updateCurrentScore();
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

    const randomizeCurrentRoundMovies = () => {
        const movies = currentRoundMovies;
        const randomizedMovies = _.shuffle(movies);
        setCurrentRoundMovies(randomizedMovies);
    };

    const updateCurrentScore = () => {
        const pointValue = 100;
        setCurrentScore((prev) => prev + pointValue);
    };

    const nextRound = () => {
        setRound((prevState) => prevState + 1);
        updateCurrentRoundMovies();
        setCurrentlySelectedMovies([]);
        console.log('round incremented');
    };

    const updateCurrentRoundMovies = () => {
        const updatedCurrentRoundMovies = [...currentRoundMovies];

        const availableMovies = currentGameMovies.filter(
            (movie) => !updatedCurrentRoundMovies.some((m) => m.id === movie.id)
        );

        if (availableMovies.length > 0) {
            const randomIndex = Math.floor(
                Math.random() * availableMovies.length
            );
            const randomMovie = availableMovies[randomIndex];
            updatedCurrentRoundMovies.push(randomMovie);
            setCurrentRoundMovies(updatedCurrentRoundMovies);
        }
    };

    const endGame = () => {
        setRound(1);
        setCurrentlySelectedMovies([]);
    };

    useEffect(() => {
        initMovieData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (round < currentlySelectedMovies.length) {
            nextRound();
        }
    });

    useEffect(() => {
        if (gameOver === true) {
            endGame();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameOver]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            {gameOver ? (
                <div key="gameOver">
                    <Scorecard
                        currentScore={currentScore}
                        bestScore={bestScore}
                        gameOver={gameOver}
                    ></Scorecard>
                    <div>Game Over</div>
                </div>
            ) : (
                <div key="gameActive">
                    <Scorecard
                        currentScore={currentScore}
                        bestScore={bestScore}
                        gameOver={gameOver}
                    ></Scorecard>
                    <RoundIndicator round={round} />
                    {currentRoundMovies.map((movie) => (
                        <div key={movie.id}>
                            <Card selectMovie={handleSelection} movie={movie} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
