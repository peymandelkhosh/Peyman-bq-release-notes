document.addEventListener('DOMContentLoaded', () => {
    fetchNotes();

    const refreshBtn = document.getElementById('refresh-btn');
    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('spinning');
        fetchNotes().finally(() => {
            setTimeout(() => {
                refreshBtn.classList.remove('spinning');
            }, 500); // Give it a slight delay to ensure smooth spin animation end
        });
    });
});

async function fetchNotes() {
    const loader = document.getElementById('loader-wrapper');
    const container = document.getElementById('notes-container');

    // Only show loader if container is hidden (initial load)
    if (container.classList.contains('hidden')) {
        loader.classList.remove('hidden');
    } else {
        // Add a slight opacity effect during background refresh
        container.style.opacity = '0.5';
    }

    try {
        const response = await fetch('/api/notes');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const notes = await response.json();
        
        loader.classList.add('hidden');
        container.classList.remove('hidden');
        container.style.opacity = '1';
        container.innerHTML = ''; // Clear container for fresh notes
        
        if (notes.length === 0) {
            container.innerHTML = '<p class="error-msg">No release notes found.</p>';
            return;
        }

        notes.forEach((note, index) => {
            const card = document.createElement('article');
            card.className = 'note-card';
            card.style.animationDelay = `${index * 0.1}s`;

            const date = new Date(note.published);
            const formattedDate = !isNaN(date) ? date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : note.published;

            const tweetText = encodeURIComponent(`Check out this BigQuery Update: ${note.title}`);
            const tweetUrl = encodeURIComponent(note.link);

            card.innerHTML = `
                <div class="note-date">${formattedDate}</div>
                <h2 class="note-title"><a href="${note.link}" target="_blank" rel="noopener noreferrer">${note.title}</a></h2>
                <div class="note-content">${note.content}</div>
                <div class="card-actions">
                    <button class="copy-btn">
                        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                    </button>
                    <a href="https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}" target="_blank" rel="noopener noreferrer" class="tweet-btn">
                        <svg class="tweet-icon" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
                        Tweet
                    </a>
                </div>
            `;

            // Copy to Clipboard Event Listener
            const copyBtn = card.querySelector('.copy-btn');
            copyBtn.addEventListener('click', () => {
                const contentDiv = card.querySelector('.note-content');
                const plainText = contentDiv.innerText || contentDiv.textContent;
                
                navigator.clipboard.writeText(plainText).then(() => {
                    const originalHTML = copyBtn.innerHTML;
                    copyBtn.innerHTML = `
                        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Copied!
                    `;
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.innerHTML = originalHTML;
                        copyBtn.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });

            
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching notes:', error);
        container.style.opacity = '1';
        loader.innerHTML = `
            <div style="color: #ef4444; text-align: center;">
                <p>Failed to load release notes.</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem; color: #94a3b8;">${error.message}</p>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-family: 'Outfit', sans-serif;">Try Again</button>
            </div>
        `;
    }
}
