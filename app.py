from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/redirect")
def redirect():
    return "Redirect link"

@app.route('/analize', methods=['POST'])
def analize():
    data = request.get_json()  # Parse JSON
    tracks = data['array']  # Get array

    # Do the analysis
    print(tracks)

    return "hello"

@app.route("/")
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)