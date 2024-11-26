import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
    config: {
        cssVarPrefix: 'ck',
        initialColorMode: 'dark',
    },
})

export default theme;