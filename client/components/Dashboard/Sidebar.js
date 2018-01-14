import { Menu, Sidebar } from 'semantic-ui-react';
import React from 'react';

export default ({ children, ...rest }) => (
    <Sidebar as={Menu}
             animation="overlay"
             width="thin"
             icon="labeled"
             vertical
             inverted
             {...rest}>
        {children}
    </Sidebar>
);
