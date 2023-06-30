import * as React from 'react';
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
            <Card variant="outlined" sx={{ maxWidth: 300 }}>
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

export function ActionAreaCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
