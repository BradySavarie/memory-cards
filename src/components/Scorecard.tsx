import { Box, Container, Typography } from '@mui/material';

interface ScorecardProps {
    currentScore: number;
    bestScore: number;
    gameOver: boolean;
    round: number;
}

const Scorecard = (props: ScorecardProps) => {
    return (
        <>
            <Container>
                <Typography
                    variant="h5"
                    sx={{ textAlign: 'center', mb: 1, mt: 5 }}
                >
                    Round {props.round}
                </Typography>
                <Box
                    display="flex"
                    gap="20px"
                    justifyContent="center"
                    alignItems="center"
                    marginBottom={5}
                >
                    <Typography variant="body2">
                        Best: {props.bestScore}
                    </Typography>
                    <Typography variant="body2">
                        Current: {props.currentScore}
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default Scorecard;
