import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {highlightedText} from '../assets/styles/highlight-text'

export default function Hero() {
  return (
    <Box id="hero">
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 0, sm: 0 },
          pb: { xs: 3, sm: 5 },
          pl: 0,
          pr: 0
        }}
      >
        <Stack
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '100%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: '4.2rem',
              fontFamily: "Poppins",
              fontWeight: 600,
            }}
          >
            <span style={highlightedText}>&nbsp;EDU Contract Search&nbsp;</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
                fontFamily: "Poppins",
                textAlign: "center",
                fontSize: "1.3em",
                color: "#666",
                lineHeight: 1.6
            }}
          >
            Code search for verified smart contracts on open campus. <br /> Find usages / implementations / inspiration and more.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}