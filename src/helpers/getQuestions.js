import offlineQuestions from '@/assets/questions.json';

const randomArray = (arr) => {
    if (!Array.isArray(arr)) {
        throw new Error('Expected an array');
    }
    return arr.toSorted(() => 0.5 - Math.random());
};

export default async function getQuestions(topics, qNumber) {
    // Validate topics
    if (!Array.isArray(topics) || topics.length === 0) {
        throw new Error('Invalid topics array');
    }

    const randomTopics = randomArray(topics);
    const messyTopics = [];
    for (let i = 0; i < qNumber; i++) {
        messyTopics.push(randomTopics[i % topics.length]);
    }

    function getOfflineQuestions() {
        const questionsPerTopic = {};
        messyTopics.forEach(topic => {
            questionsPerTopic[topic] = (questionsPerTopic[topic] || 0) + 1;
        });

        const questions = [];
        Object.keys(questionsPerTopic).forEach(topic => {
            // Check if questions exist for the topic
            if (!offlineQuestions[topic]) {
                console.warn(`No questions found for topic: ${topic}`);
                return; // Skip this topic
            }

            randomArray(offlineQuestions[topic])
                .slice(0, questionsPerTopic[topic])
                .forEach(question => {
                    questions.push({
                        ...question,
                        topic,
                        answers: randomArray(question.answers),
                        userAnswer: undefined,
                        ia: false
                    });
                });
        });

        return questions;
    }

    // Simulate delay in development mode
    if (process.env.NODE_ENV === 'development') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(randomArray(getOfflineQuestions()));
            }, 1000);
        });
    }

    // Fetch IA questions from the API
    const iaQuestions = fetch('/api/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topics: messyTopics.slice(0, 3) })
    })
    .then(res => res.json())
    .then(data => {
        if (data.statusCode >= 400) {
            const error = new Error(data.message);
            error.statusCode = data.status;
            throw error;
        }
        return data;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

    // Combine IA questions with offline questions
    return iaQuestions
        .then(iaQuestions => randomArray([
            ...iaQuestions,
            ...getOfflineQuestions().slice(iaQuestions.length)
        ]))
        .catch(() => randomArray(getOfflineQuestions()));
}