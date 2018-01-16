const ERROR = {
    DB_ADMINS_GET: 'Could not retrieve admins from the database!',
    DB_APPLICATION_TO_REVIEW_GET: 'Could not retrieve an application to review from the database!',
    DB_APPLICATIONS_WITH_REVIEWS_GET: 'Could not retrieve any applications with reviews from the database!',
    DB_GOLDEN_TICKETS_REDUCE: 'Could not reduce the amount of golden tickets for the reviewer!',
    DB_REVIEW_CREATE: 'Could not add a review to the specified application',
    DB_REVIEWS_GET: 'Could not get a review from the specified application',
    DB_REVIEWERS_GET: 'Could not retrieve reviewers from the database!',
    DB_SETTINGS_GET: 'Could not retrieve settings from the database!',
    DB_UPDATE_APPLICATION_STATUS: 'Could not update the application status of the supplied user for the specified event!',
    DB_USER_CREATE: 'Error creating User in the database!',
    DB_USER_GET: 'Could not retrieve that user from the database!',
    DB_USER_UPDATE: 'Could not update the specified user in the database!',
    DB_USERS_GET: 'Error retrieving Users from the database!',

    NO_ADMINS_EXIST: 'No admins exist in the database!',
    NO_APPLICATION_TO_REVIEW_EXISTS: 'No application to review exists in the database!',
    NO_APPLICATIONS_WITH_REVIEWS_EXIST: 'No applications with reviews exist in the database!',
    NO_GOLDEN_TICKETS: 'No golden tickets are left for this reviewer!',
    NO_REVIEWERS_EXIST: 'No reviewers exist in the database!',
    NO_SETTINGS_EXIST: 'No settings exist in the database!',

    INVALID_APPLICATION_STATUS: 'Invalid application status supplied!',
    INVALID_CREDENTIALS: 'You have provided invalid credentials!',
    INVALID_EVENT_ID: 'An event with this identifier not exist!',
    INVALID_REFRESH_TOKEN: 'The refresh token provided is invalid!',
    INVALID_RESET_HASH: 'A user with this reset hash does not exist!',
    INVALID_USER_ID: 'A user with this identifier does not exist!',
    INVALID_USER_EMAIL: 'A user with this email does not exist!',

    ALREADY_HAS_GOLDEN_TICKET: 'This application already has a golden ticket!',
    RESET_HASH_CREATE_FAIL: 'Error when creating the reset hash!'
};

module.exports = ERROR;
