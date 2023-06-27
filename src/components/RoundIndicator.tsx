interface RoundIndicatorProps {
    round: number;
}

const RoundIndicator = (props: RoundIndicatorProps) => {
    return (
        <div>
            <p>Round: {props.round}</p>
        </div>
    );
};

export default RoundIndicator;
