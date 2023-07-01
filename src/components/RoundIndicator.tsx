import { Typography } from '@mui/material';

interface RoundIndicatorProps {
    round: number;
}

const RoundIndicator = (props: RoundIndicatorProps) => {
    return (
        <>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Round {props.round}
            </Typography>
        </>
    );
};

export default RoundIndicator;
