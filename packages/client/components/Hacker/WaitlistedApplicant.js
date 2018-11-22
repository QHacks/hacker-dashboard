import Emoji from "react-emoji-render";
import React from "react";

export default () => (
  <div>
    <h2>
      <Emoji text="You are on the waiting list! :heart: :honeybee:" />
    </h2>
    <p>
      This years applicant pool was the best yet, making our decision-making
      process harder than ever.
    </p>
    <p>
      We've had to place you on the waitlist, but don't fret! We'll be accepting
      people from our waitlist as spots open up, so keep an eye on your inbox!
    </p>
    <p>
      The applicants that were accepted have been told to RSVP by Wednesday,
      January 24th, 2018 at 11:59PM. After that point we will be accepting
      people off of the waiting list.
    </p>
    <p>Stay tuned for more information!</p>
  </div>
);
