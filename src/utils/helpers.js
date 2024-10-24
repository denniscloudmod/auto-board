import {matchHas} from "next/dist/shared/lib/router/utils/prepare-destination";

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



export const parseMarkdown = (markdownData, userId="e16575cd-e9d3-47d5-b3ba-d3ef612f5683") => {
    const lines = markdownData.split('\n').filter(line => line.trim());
    let currentBoard = null;
    let currentTask = null;
    let currentSection = null;
    const parsedStructure = {
        board: null,
        columns: [],
        tasks: []
    };

    // Default columns
    const defaultColumns = [
        { label: 'To Do', dataField: 'todo', order: 1 },
        { label: 'Doing', dataField: 'doing', order: 2 },
        { label: 'Done', dataField: 'done', order: 3 }
    ];

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        // Parse board title
        if (trimmedLine.startsWith('# ')) {
            const boardId = crypto.randomUUID();
            parsedStructure.board = {
                id: boardId,
                title: trimmedLine.substring(2).trim(),
                color: '#3490dc',
                userId: userId,
            };

            // Add default columns
            parsedStructure.columns = defaultColumns.map(col => ({
                boardId: boardId,
                ...col,
            }));
        }

        // Parse tasks
        if (trimmedLine.startsWith('**')) {
        // if (trimmedLine.startsWith('**') && !trimmedLine.includes('System')) {
            const taskText = trimmedLine.replace(/\*\*/g, '').trim();
            currentTask = {
                id: crypto.randomUUID(),
                boardId: parsedStructure.board.id,
                columnId: parsedStructure.columns[0].id, //  first column (To Do)
                text: taskText,
                description: '',
                status: 'todo',
                statusLabel: 'To Do',
                userId: userId
            };
            currentSection = taskText;
        }

        // Parse task descriptions
        if (trimmedLine.startsWith('* ') && currentSection) {
            const description = trimmedLine.substring(2).trim();
            const newTask = {
                id: uuidv4(),
                boardId: parsedStructure.board.id,
                columnId: parsedStructure.columns[0].id,
                text: description,
                description: `Part of ${currentSection}`,
                status: 'todo',
                statusLabel: 'To Do',
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: userId
            };
            parsedStructure.tasks.push(newTask);
        }
    });

    return parsedStructure;
};


function parseMarkdown2(markdown) {
    const lines = markdown.split('\n');
    let boardTitle = '';
    let tasks = [];
    let currentCategory = '';
    let currentTask = '';

    lines.forEach(line => {
        line = line.trim();

        // Check for board title (#)
        if (line.startsWith('# ')) {
            boardTitle = line.substring(2).trim();
        }

        // Check for a new task category (e.g., **Customer Experience:**)
        else if (line.startsWith('**') && line.endsWith(':**')) {
            currentCategory = line.substring(2, line.length - 2).trim();
        }

        // Check for task title (**Task Title**)
        else if (line.startsWith('**') && !line.endsWith(':**')) {
            currentTask = {
                title: line.substring(2, line.length - 2).trim(),
                description: '',
                category: currentCategory
            };
            tasks.push(currentTask);
        }

        // Check for task description (* Task Description)
        else if (line.startsWith('*')) {
            currentTask.description += line.substring(1).trim() + ' ';
        }
    });

    return { boardTitle, tasks };
}


async function createKanbanBoardFromMarkdown(markdown) {
    // Parse the markdown data
    const { boardTitle, tasks } = parseMarkdown(markdown);


    const board = await drizzle.insertInto('boards').values({
        title: boardTitle,
        color: '#3490dc',
        userId: currentUser.id,  // replace with actual userId
    }).returning();

    // Iterate through tasks and create columns and tasks
    const categories = new Set(tasks.map(task => task.category));

    for (const category of categories) {
        // Create a column for each category
        const column = await drizzle.insertInto('columns').values({
            boardId: board.id,
            label: category,
            dataField: category.toLowerCase().replace(/ /g, '_'),
            order: 1,  // Order can be determined based on your need
        }).returning();

        // Create tasks under this category
        for (const task of tasks.filter(t => t.category === category)) {
            await drizzle.insertInto('tasks').values({
                boardId: board.id,
                columnId: column.id,
                text: task.title,
                description: task.description,
                status: 'pending', // or any default status
                userId: currentUser.id,  // replace with actual userId
            });
        }
    }
}