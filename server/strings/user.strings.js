const USER = {
    APPLICATION: {
        RSVPS: {
            ACCEPTED: 'ACCEPTED',
            DECLINED: 'DECLINED',
            NOT_NEEDED: 'NOT_NEEDED',
            PENDING: 'PENDING'
        },
        STATUSES: {
            APPLIED: 'APPLIED',
            REJECTED: 'REJECTED',
            WAITING_LIST: 'WAITING_LIST',
            ACCEPTED: 'ACCEPTED',
            WITHDRAWN: 'WITHDRAWN'
        }
    },
    TSHIRT_SIZES: ['Small', 'Medium', 'Large', 'Extra Large'],
    DEGREE_TYPES: [
        'Bachelor\'s degree',
        'Master\'s degree',
        'Ph.D.',
        'High School',
        'Other'
    ],
    GENDERS: [
        'Female',
        'Male',
        'Other',
        'Prefer not to say'
    ],
    MONTHS_IN_A_YEAR: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    NUMBER_OF_HACKATHONS: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
    ROLES: {
        ADMIN: 'ADMIN',
        HACKER: 'HACKER',
        PARTNER: 'PARTNER'
    }
};

module.exports = USER;
