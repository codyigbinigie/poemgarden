document.addEventListener('DOMContentLoaded', () => {
    const poemForm = document.getElementById('poemForm');
    const poemList = document.getElementById('poemList');

    // Inspiration Data: Array of objects each with a quote and a prompt
    const inspirations = [
        {
            quote: `"Poetry is when an emotion has found its thought and the thought has found words." — Robert Frost`,
            prompt: `Prompt: Write a few lines about the feeling of sunrise.`
        },
        {
            quote: `"A poet is, before anything else, a person who is passionately in love with language." — W.H. Auden`,
            prompt: `Prompt: Describe the sensation of walking through a quiet forest at dawn.`
        },
        {
            quote: `"If I feel physically as if the top of my head were taken off, I know that is poetry." — Emily Dickinson`,
            prompt: `Prompt: Write a poem about a memory that feels both distant and vivid.`
        },
        {
            quote: `"Poetry is an echo, asking a shadow to dance." — Carl Sandburg`,
            prompt: `Prompt: Imagine you are a raindrop falling onto a leaf. Describe that journey.`
        },
        {
            quote: `"Genuine poetry can communicate before it is understood." — T.S. Eliot`,
            prompt: `Prompt: Write about a single object in your room as if it's a living being with thoughts and emotions.`
        }
    ];

    const inspirationQuoteEl = document.getElementById('inspirationQuote');
    const inspirationPromptEl = document.getElementById('inspirationPrompt');
    const newInspirationBtn = document.getElementById('newInspirationBtn');

    function showRandomInspiration() {
        const randomIndex = Math.floor(Math.random() * inspirations.length);
        const inspiration = inspirations[randomIndex];
        inspirationQuoteEl.textContent = inspiration.quote;
        inspirationPromptEl.textContent = inspiration.prompt;
    }

    // Show a random inspiration at the start
    showRandomInspiration();

    // Allow user to fetch a new inspiration
    newInspirationBtn.addEventListener('click', showRandomInspiration);

    // Load any saved poems from localStorage
    let poems = JSON.parse(localStorage.getItem('poems')) || [];

    // Render all poems
    function renderPoems() {
        poemList.innerHTML = '';
        poems.forEach((poem, index) => {
            const poemDiv = document.createElement('div');
            poemDiv.className = 'poem';

            const titleEl = document.createElement('h3');
            titleEl.className = 'poem-title';
            titleEl.textContent = poem.title;

            const authorEl = document.createElement('p');
            authorEl.className = 'poem-author';
            authorEl.textContent = `by ${poem.author}`;

            const contentEl = document.createElement('p');
            contentEl.className = 'poem-content';
            contentEl.textContent = poem.content;

            const commentToggleBtn = document.createElement('button');
            commentToggleBtn.className = 'comment-toggle';
            commentToggleBtn.textContent = 'Show Comments';

            const commentSection = document.createElement('div');
            commentSection.className = 'comment-section';

            const commentList = document.createElement('ul');
            commentList.className = 'comment-list';
            poem.comments = poem.comments || []; 

            poem.comments.forEach((comment) => {
                const li = document.createElement('li');
                const authorSpan = document.createElement('span');
                authorSpan.className = 'comment-author';
                authorSpan.textContent = comment.author + ':';

                const textSpan = document.createElement('span');
                textSpan.className = 'comment-text';
                textSpan.textContent = ' ' + comment.text;

                li.appendChild(authorSpan);
                li.appendChild(textSpan);
                commentList.appendChild(li);
            });

            const addCommentForm = document.createElement('form');
            addCommentForm.className = 'add-comment-form';

            const commentAuthorInput = document.createElement('input');
            commentAuthorInput.type = 'text';
            commentAuthorInput.placeholder = 'Your Name';
            commentAuthorInput.required = true;

            const commentTextInput = document.createElement('textarea');
            commentTextInput.placeholder = 'Your Comment';
            commentTextInput.rows = 2;
            commentTextInput.required = true;

            const addCommentBtn = document.createElement('button');
            addCommentBtn.type = 'submit';
            addCommentBtn.textContent = 'Add Comment';

            addCommentForm.appendChild(commentAuthorInput);
            addCommentForm.appendChild(commentTextInput);
            addCommentForm.appendChild(addCommentBtn);

            addCommentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const newCommentAuthor = commentAuthorInput.value.trim();
                const newCommentText = commentTextInput.value.trim();
                if (newCommentAuthor && newCommentText) {
                    poem.comments.push({ author: newCommentAuthor, text: newCommentText });
                    localStorage.setItem('poems', JSON.stringify(poems));
                    renderPoems();
                }
            });

            commentSection.appendChild(commentList);
            commentSection.appendChild(addCommentForm);

            commentToggleBtn.addEventListener('click', () => {
                commentSection.classList.toggle('show');
                commentToggleBtn.textContent = commentSection.classList.contains('show') 
                    ? 'Hide Comments' 
                    : 'Show Comments';
            });

            poemDiv.appendChild(titleEl);
            poemDiv.appendChild(authorEl);
            poemDiv.appendChild(contentEl);
            poemDiv.appendChild(commentToggleBtn);
            poemDiv.appendChild(commentSection);

            poemList.appendChild(poemDiv);
        });
    }

    // Initial render
    renderPoems();

    // Handle adding a new poem
    poemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const content = document.getElementById('content').value.trim();

        if (title && author && content) {
            poems.push({ title, author, content, comments: [] });
            localStorage.setItem('poems', JSON.stringify(poems));
            renderPoems();
            poemForm.reset();
        } else {
            alert("Please fill in all fields before submitting.");
        }
    });
});
