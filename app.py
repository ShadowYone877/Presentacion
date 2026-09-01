from flask import Flask, render_template

app = Flask(__name__)

slides = [
    {
        "id": 1,
        "speaker": "Integrante 1",
        "speaker_num": 1,
        "type": "cover",
    },
    {
        "id": 2,
        "speaker": "Integrante 1",
        "speaker_num": 1,
        "type": "definition",
    },
    {
        "id": 3,
        "speaker": "Integrante 1",
        "speaker_num": 1,
        "type": "objectives",
    },
    {
        "id": 4,
        "speaker": "Integrante 2",
        "speaker_num": 2,
        "type": "color",
    },
    {
        "id": 5,
        "speaker": "Integrante 2",
        "speaker_num": 2,
        "type": "typography",
    },
    {
        "id": 6,
        "speaker": "Integrante 3",
        "speaker_num": 3,
        "type": "hierarchy",
    },
    {
        "id": 7,
        "speaker": "Integrante 3",
        "speaker_num": 3,
        "type": "composition",
    },
    {
        "id": 8,
        "speaker": "Integrante 4",
        "speaker_num": 4,
        "type": "ux-ui",
    },
    {
        "id": 9,
        "speaker": "Integrante 4",
        "speaker_num": 4,
        "type": "responsive",
    },
    {
        "id": 10,
        "speaker": "Integrante 5",
        "speaker_num": 5,
        "type": "analysis",
    },
    {
        "id": 11,
        "speaker": "Integrante 5",
        "speaker_num": 5,
        "type": "conclusion",
    },
]

speakers = [
    {"num": 1, "name": "Integrante 1", "slides": [1, 2, 3]},
    {"num": 2, "name": "Integrante 2", "slides": [4, 5]},
    {"num": 3, "name": "Integrante 3", "slides": [6, 7]},
    {"num": 4, "name": "Integrante 4", "slides": [8, 9]},
    {"num": 5, "name": "Integrante 5", "slides": [10, 11]},
]


@app.route("/")
def presentation():
    return render_template(
        "index.html",
        slides=slides,
        speakers=speakers,
        total_slides=len(slides),
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
