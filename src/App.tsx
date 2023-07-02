import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import _ from 'lodash';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from './components/GlobalStyles';
import { CircularProgress, Button, Box, Grid } from '@mui/material';
import RoundIndicator from './components/RoundIndicator';
import { MovieCard } from './components/MovieCard';
import { Header } from './components/Header';

const theme = createTheme({
    typography: {
        fontFamily: ['Caprasimo', 'cursive'].join(','),
    },
});

export interface Movie {
    id: number;
    title: string;
    posterURL: string;
    imdbId: string;
}

export default function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [round, setRound] = useState<number>(1);
    const [rawMovieData, setRawMovieData] = useState<Movie[]>([]);
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
        setRawMovieData(cleanData);
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

        if (gameOver) {
            for (let i = 0; i <= 1; i++) {
                currentMovies.push(movies[i]);
            }
        } else {
            for (let i = 0; i <= round; i++) {
                currentMovies.push(movies[i]);
            }
        }

        setCurrentRoundMovies(currentMovies);
    };

    const handleSelection = (movie: Movie) => {
        selectMovie(movie);
        randomizeCurrentRoundMovies();
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
            updateScores();
        } else {
            setGameOver(true);
        }
    };

    const randomizeCurrentRoundMovies = () => {
        const movies = currentRoundMovies;
        const randomizedMovies = _.shuffle(movies);
        setCurrentRoundMovies(randomizedMovies);
    };

    const updateScores = () => {
        const pointValue = 100;
        setCurrentScore((prev) => prev + pointValue);
        if (bestScore <= currentScore + pointValue) {
            setBestScore(currentScore + pointValue);
        }
    };

    const nextRound = () => {
        setRound((prevState) => prevState + 1);
        updateCurrentRoundMovies();
        setCurrentlySelectedMovies([]);
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

    const startNewGame = () => {
        setCurrentScore(0);
        setRound(1);
        getCurrentGameMovies(rawMovieData);
        setCurrentlySelectedMovies([]);
        setGameOver(false);
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

    if (isLoading)
        return (
            <div>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                >
                    <CircularProgress />
                </Box>
            </div>
        );

    return (
        <>
            <CssBaseline />
            <GlobalStyles />
            {gameOver ? (
                <div key="gameOver">
                    <ThemeProvider theme={theme}>
                        <Header
                            currentScore={currentScore}
                            bestScore={bestScore}
                            gameOver={gameOver}
                        />
                        <div>Game Over</div>
                        <Button variant="contained" onClick={startNewGame}>
                            Play Again
                        </Button>
                    </ThemeProvider>
                </div>
            ) : (
                <div key="gameActive">
                    <ThemeProvider theme={theme}>
                        <Header
                            currentScore={currentScore}
                            bestScore={bestScore}
                            gameOver={gameOver}
                        />

                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            gap="20px"
                        >
                            <RoundIndicator round={round} />

                            <Grid container spacing={6} justifyContent="center">
                                {currentRoundMovies.map((movie) => (
                                    <Grid item key={movie.id}>
                                        <MovieCard
                                            selectMovie={handleSelection}
                                            movie={movie}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </ThemeProvider>
                </div>
            )}
        </>
    );
}
