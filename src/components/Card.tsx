import { Movie } from '../App';

interface CardProps {
    selectMovie: (movie: Movie) => void;
    movie: Movie;
}

const Card = (props: CardProps) => {
    return (
        <div onClick={() => props.selectMovie(props.movie)}>
            <p>{props.movie.title}</p>
            <img src={props.movie.posterURL} />
        </div>
    );
};

export default Card;
