import * as React from 'react';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import Key from '@mui/icons-material/Key';

 const Login=()=> {
  return (
    <> <Stack spacing={2}>
      <Input
        placeholder="Type in here…"
        sx={{
          '&::before': {
            border: '1.5px solid var(--Input-focusedHighlight)',
            transform: 'scaleX(0)',
            left: '2.5px',
            right: '2.5px',
            bottom: 0,
            top: 'unset',
            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
            borderBottomLeftRadius: '64px 20px',
            borderBottomRightRadius: '64px 20px',
          },
          '&:focus-within::before': {
            transform: 'scaleX(1)',
          },
        }}
      />
      <Input
        placeholder="Type in here…"
        variant="soft"
        sx={{
          '--Input-radius': '0px',
          borderBottom: '2px solid',
          borderColor: 'neutral.outlinedBorder',
          '&:hover': {
            borderColor: 'neutral.outlinedHoverBorder',
          },
          '&::before': {
            border: '1px solid var(--Input-focusedHighlight)',
            transform: 'scaleX(0)',
            left: 0,
            right: 0,
            bottom: '-2px',
            top: 'unset',
            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
          },
          '&:focus-within::before': {
            transform: 'scaleX(1)',
          },
        }}
      />  </Stack>
    <Stack spacing={0.5} sx={{ '--hue': Math.min(value.length * 10, 120) }}>
    <Input
      type="password"
      placeholder="Type in here…"
      startDecorator={<Key />}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
    <LinearProgress
      determinate
      size="sm"
      value={Math.min((value.length * 100) / minLength, 100)}
      sx={{ bgcolor: 'background.level3', color: 'hsl(var(--hue) 80% 40%)' }}
    />
    <Typography
      level="body-xs"
      sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
    >
      {value.length < 3 && 'Very weak'}
      {value.length >= 3 && value.length < 6 && 'Weak'}
      {value.length >= 6 && value.length < 10 && 'Strong'}
      {value.length >= 10 && 'Very strong'}
    </Typography>
  </Stack></>
  );
}
export default Login