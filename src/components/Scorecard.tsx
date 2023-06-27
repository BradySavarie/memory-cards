import Timer from './Timer';

interface Scorecard {
    currentScore: number;
    bestScore: number;
}

const Scorecard = (props: Scorecard) => {
    return (
        <div>
            <h1>Scorecard</h1>
            <p>Best: {props.bestScore}</p>
            <p>Current: {props.currentScore}</p>
            <Timer />
        </div>
    );
};

export default Scorecard;
