import React from 'react';
import { Box, Typography } from '@mui/material';
import bg from '../assets/footer-bg.jpg';

const PageHeader = ({ children }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                textAlign: 'center',
                paddingTop: '64px', // header-height
                paddingBottom: '2rem',
                marginBottom: '2rem',
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top',
                color: 'white',
            }}
        >
            {/* Gradient Overlay */}
            <Box
                sx={{
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100px',
                    backgroundImage: 'linear-gradient(to top, #0f0f0f, rgba(0, 0, 0, 0))',
                    zIndex: 1,
                }}
            />
            
            {/* Heading */}
            <Typography
                variant="h4"
                component="h2"
                sx={{
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                {children}
            </Typography>
        </Box>
    );
};

export default PageHeader;
