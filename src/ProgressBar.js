// ref: https://mui.com/components/progress/
import {styled} from '@mui/material/styles';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import {Box, Stack} from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 20,
    borderRadius: 2,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        border:2,
        borderStyle:'solid',
        borderColor: '#82cdff',
        backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 2,
        background: '#50afff'
    },
}));

const ProgressBar = (props) => {
    const {value, variant} = props;
    const percentage = parseFloat(value).toFixed(1);

    return <Stack direction={'row'} spacing={2}>
        <Box flexGrow={1}>
            <BorderLinearProgress {...props}/>
        </Box>
        {variant === 'determinate' &&
            <div>
                {percentage}%
            </div>
        }
    </Stack>;
};

export default ProgressBar;
