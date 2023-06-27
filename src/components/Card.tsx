interface CardProps {
    title: string;
    posterURL: string;
}

const Card = (props: CardProps) => {
    return (
        <div>
            <p>{props.title}</p>
            <img src={props.posterURL} />
        </div>
    );
};

export default Card;
