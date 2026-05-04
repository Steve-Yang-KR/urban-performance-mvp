from fastapi import FastAPI
import cv2
import mediapipe as mp
import requests
import tempfile

app = FastAPI()
mp_pose = mp.solutions.pose

def download_video(url):
    r = requests.get(url)
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
    tmp.write(r.content)
    return tmp.name

def analyze_pose(video_path):
    cap = cv2.VideoCapture(video_path)
    results = []

    with mp_pose.Pose() as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            res = pose.process(frame)
            if res.pose_landmarks:
                results.append(res.pose_landmarks.landmark)

    return results

def compute_score(landmarks):
    return 80 + len(landmarks) % 20  # 임시 로직

@app.post("/analyze")
def analyze(data: dict):
    video_url = data["url"]

    video_path = download_video(video_url)
    landmarks = analyze_pose(video_path)
    score = compute_score(landmarks)

    return {
        "score": score,
        "feedback": "Good movement, improve posture"
    }
