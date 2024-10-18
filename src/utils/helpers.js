export const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const generatePlannerQuestionnaireId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const generateCreatedAt = () => {
    return new Date().toISOString().split('T')[0];
};

export const generateUpdatedAt = () => {
    return new Date().toISOString().split('T')[0];
};
export const generateUserId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const generateUserName = () => {
    const adjectives = ["Quick", "Lazy", "Happy", "Sad", "Bright", "Dark"];
    const nouns = ["Fox", "Dog", "Cat", "Mouse", "Bear", "Lion"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${randomAdjective} ${randomNoun}${randomNumber}`;
};

export const generateUserData = () => {
    return {
        id: generateUserId(),
        name: generateUserName()
    };
};

export const generateProjectName = () => {
    const adjectives = ["Innovative", "Creative", "Agile", "Dynamic", "Smart", "Intelligent"];
    const nouns = ["Project", "Solution", "Product", "Service", "System", "Platform"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
};