export type PasswordType = 'short' | 'long' | 'noUpper' | 'noLower' | 'noDigit' | 'noSpecial';

const getRandomString = (length: number, chars: string): string => {
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

export function generatePassword(type?: PasswordType): string {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const all = lower + upper + digits;

    switch (type) {
        case 'short':     return getRandomString(7, all); 
        case 'long':      return getRandomString(16, all); 
        case 'noUpper':   return getRandomString(10, lower + digits); 
        case 'noLower':   return getRandomString(10, upper + digits); 
        case 'noDigit':   return getRandomString(10, lower + upper);  
        default:          
            const length = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
            return (
                getRandomString(1, lower) + 
                getRandomString(1, upper) + 
                getRandomString(1, digits) + 
                getRandomString(length - 3, all)
            ).split('').sort(() => 0.5 - Math.random()).join('');
    }
}