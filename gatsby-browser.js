import React from 'react';
import LayoutState from './src/context/LayoutContext';
import './styles.css';

export const wrapRootElement = ({ element }) => <LayoutState>{element}</LayoutState>;
