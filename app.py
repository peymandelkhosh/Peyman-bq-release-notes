import feedparser
from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/notes')
def get_notes():
    url = "https://docs.cloud.google.com/feeds/bigquery-release-notes.xml"
    feed = feedparser.parse(url)
    entries = []
    for entry in feed.entries:
        # Some feeds use 'summary', some use 'content'
        content = ""
        if hasattr(entry, 'content'):
            content = entry.content[0].value
        elif hasattr(entry, 'summary'):
            content = entry.summary
            
        entries.append({
            'title': entry.get('title', 'No Title'),
            'link': entry.get('link', '#'),
            'published': entry.get('published', entry.get('updated', 'Unknown Date')),
            'content': content
        })
    return jsonify(entries)

if __name__ == '__main__':
    app.run(debug=True)
