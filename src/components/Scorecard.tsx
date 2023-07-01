import Timer from './Timer';
import { Box, Typography } from '@mui/material';

interface ScorecardProps {
    currentScore: number;
    bestScore: number;
    gameOver: boolean;
}

const Scorecard = (props: ScorecardProps) => {
    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Scorecard
                </Typography>
                <Box
                    display="flex"
                    gap="20px"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="body2">
                        <strong>Best:</strong> {props.bestScore}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Current:</strong> {props.currentScore}
                    </Typography>
                </Box>
                {!props.gameOver && <Timer />}
            </Box>
        </>
    );
};

export default Scorecard;
