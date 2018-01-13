import React from 'react';
import { Button, Popup } from 'semantic-ui-react';

function noop() {
}

const NO_SCORE = 1;
const MAYBE_SCORE = 2;
const YES_SCORE = 3;
const GOLDEN_TICKET_SCORE = Number.MAX_SAFE_INTEGER;

export const SCORES = {
    NO_SCORE,
    MAYBE_SCORE,
    YES_SCORE,
    GOLDEN_TICKET_SCORE
};

export default ({ onVote = noop, ...rest }) => {
    function renderGoldenTicketTrigger() {
        return (
            <Button color="yellow"
                    icon="ticket"
                    content="Use Golden Ticket"/>
        );
    }

    function renderGoldenTicketContent() {
        return (
            <Button color="green"
                    content="I'm sure!"
                    onClick={() => onVote(GOLDEN_TICKET_SCORE, { goldenTicket: true })}
            />
        );
    }

    return (
        <div {...rest}>
            <div>
                <Button onClick={() => onVote(NO_SCORE)}
                        negative>
                    No
                </Button>
                <Button onClick={() => onVote(MAYBE_SCORE)}>
                    Maybe
                </Button>
                <Button onClick={() => onVote(YES_SCORE)}
                        positive>
                    Yes
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                <Popup
                    trigger={renderGoldenTicketTrigger()}
                    content={renderGoldenTicketContent()}
                    on='click'
                    position='bottom right'
                />
            </div>
        </div>
    );
};
