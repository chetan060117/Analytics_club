from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime
import json

app = Flask(__name__)

@app.context_processor
def inject_current_year():
    return {'current_year': datetime.now().year}

@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/events')
def events():
    try:
        with open('events.json') as f:
            events_data = json.load(f)
    except FileNotFoundError:
        events_data = []
    return render_template('events.html', events=events_data)

@app.route('/event/<int:event_id>')
def event_details(event_id):
    try:
        with open('events.json') as f:
            events_data = json.load(f)
    except FileNotFoundError:
        return "Events data not found.", 404
        
    event = next((event for event in events_data if event['id'] == event_id), None)
    if event:
        return render_template('event_details.html', event=event)
    return "Event not found", 404


if __name__ == '__main__':
    app.run(debug=True)
