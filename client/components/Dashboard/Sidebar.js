import React from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';

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
