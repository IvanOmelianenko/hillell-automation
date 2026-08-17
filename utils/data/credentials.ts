export function generateWrongEmailFormat() {
    return `test-email${Date.now()}`
}

export function generateRandomEmail() {
    return `test-email${Date.now()}@example.com`
}

export function generateRandomPassword() {
    return `Pass@${Date.now()}`
}

export function generateInvalidName() {
    const invalidChars = "!@#$%^&*()1234567890";
    return invalidChars.charAt(Math.floor(Math.random() * invalidChars.length));
}

export function generateInvalidNameMinChars() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return chars[Math.floor(Math.random() * chars.length)];
}

export function generateInvalidNameMaxChars() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let name = '';
    for (let i = 0; i < 21; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name;
}

export function generateNameWithSpace() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let name = '';
    for (let i = 0; i < 5; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name + ' ' + name;    
}

  export function generateName(): string {
    const length = Math.floor(Math.random() * 6) + 3;
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    
    let name = Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    
    return name.charAt(0).toUpperCase() + name.slice(1);
}  

