
export const validateFirstName = (firstName) => {
    const minLength = 3;
    const maxLength = 150;
    if (!firstName) {
        return 'First name is required.';
    } else if (firstName.length < minLength || firstName.length > maxLength) {
        return `First name must be between ${minLength} and ${maxLength} characters.`;
    }
    const regex = /^[A-Za-z\s]+$/;

    if (!regex.test(firstName)) {
        return 'First name can only contain letters and spaces.';
    }
    return null;
};
export const validateLastName = (lastName) => {
    const minLength = 3;
    const maxLength = 150;
    if (!lastName) {
        return 'Last name is required.';
    } else if (lastName.length < minLength || lastName.length > maxLength) {
        return `Last name must be between ${minLength} and ${maxLength} characters.`;
    }
    const regex = /^[A-Za-z\s]+$/;

    if (!regex.test(lastName)) {
        return 'Last name can only contain letters and spaces.';
    }

    return null;
};

export const validateAge = (birthday) => {
    if (!birthday) {
        return 'Birthday is required.';
    }

    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 0) {
        return 'Invalid birthday.';
    } else if (age < 13) {
        return 'Age must be 13 or older.';
    } else if (age >= 100) {
        return 'Age must be younger than 100.';
    } else {
        return null;
    }
};

export const validateUsername = (username) => {
    const minLength = 6;
    const maxLength = 150;
    if (!username) {
        return 'Username is required.';
    } else if (username.length < minLength || username.length > maxLength) {
        return `Username must be between ${minLength} and ${maxLength} characters.`;
    } else {
        return null;
    }
};
export const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 150;

    if (!password) {
        return 'Password is required.';
    } else if (password.length < minLength || password.length > maxLength) {
        return `Password must be between ${minLength} and ${maxLength} characters.`;
    } else {
        return null;
    }
};
export const validatePasswordComplexity = (password) => {
    const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

    if (!password) {
        return 'Password is required.';
    } else if (!complexityRegex.test(password)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    } else {
        return null;
    }
};
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return 'Email is required.';
    } else if (email.length > 150) {
        return 'Email must be 150 characters or less.'
    } else if (!emailRegex.test(email)) {
        return 'Enter a valid email address.';
    } else {
        return null;
    }
};

