import { Header, Segment } from 'semantic-ui-react';
import Emoji from 'react-emoji-render';
import React from 'react';

export default () => (
  <Segment>
    <Header as="h2">
      <Emoji text="Thank you from QHacks! :heart:" />
    </Header>
    <p>
      Thank you for withdrawing your application! Your position will be given to
      someone on the waiting list.
    </p>
    <p>We wish you all the best and keep hacking!</p>
  </Segment>
);
