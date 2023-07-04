import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Movie } from '../App';

interface CardProps {
    selectMovie: (selection: Movie) => void;
    movie: Movie;
}

export const MovieCard = (props: CardProps) => {
    const handleClick = () => {
        props.selectMovie(props.movie);
    };

    return (
        <>
            <Card variant="elevation" elevation={3} sx={{ maxWidth: 300 }}>
                <CardActionArea onClick={handleClick}>
                    <CardMedia
                        component="img"
                        src={props.movie.posterURL}
                        height="350"
                        alt="Movie Poster"
                    />
                    <CardContent>
                        <Typography
                            variant="subtitle1"
                            color="text.primary"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            {props.movie.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};
