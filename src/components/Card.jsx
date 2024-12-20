import { Stack, Typography } from '@mui/material'

export default function Card({ title, description, id }) {
    return (
        <div>
            <Stack border={'3px solid #e5e5e5'} borderRadius={'10px'} p={"20px"} m={"20px"}>
                <Typography mb={'20px'} variant='h2'> {title} </Typography>
                <Typography> {description} </Typography>
            </Stack>

        </div>
    )
}
