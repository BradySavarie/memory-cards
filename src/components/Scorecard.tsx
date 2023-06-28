import Timer from './Timer';

interface ScorecardProps {
    currentScore: number;
    bestScore: number;
    gameOver: boolean;
}

const Scorecard = (props: ScorecardProps) => {
    return (
        <div>
            <h1>Scorecard</h1>
            <p>Best: {props.bestScore}</p>
            <p>Current: {props.currentScore}</p>
            {!props.gameOver && <Timer />}
        </div>
    );
};

export default Scorecard;
