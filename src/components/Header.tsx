import { Box } from '@mui/material';
import Scorecard from './Scorecard';

interface HeaderProps {
    currentScore: number;
    bestScore: number;
    gameOver: boolean;
}

export const Header = (props: HeaderProps) => {
    return (
        <>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                padding="5px 15px"
                height="100px"
            >
                <Scorecard
                    currentScore={props.currentScore}
                    bestScore={props.bestScore}
                    gameOver={props.gameOver}
                ></Scorecard>
            </Box>
        </>
    );
};
