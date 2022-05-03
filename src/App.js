import React from 'react';
import {CssBaseline, ThemeProvider} from '@material-ui/core';
import Layout from "./components/layout/Layout";
import Theme from './Theme';
import {FeatureToggleProvider } from "react-feature-toggles/lib";
import useTogggles from './components/toggles/hooks/useToggles'

export default () => {
    const {toggles} = useTogggles();
    
    return (
        <FeatureToggleProvider featureToggleList={toggles}>
        <ThemeProvider theme={Theme}>
            <CssBaseline/>
            <Layout/>
        </ThemeProvider>
        </FeatureToggleProvider>
    );
};
