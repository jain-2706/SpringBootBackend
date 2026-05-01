from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime, timedelta

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

# INPUT FORMAT 
class RequestData(BaseModel):
    transcript: str
    team_members: Optional[List[str]] = []

#HELPER FUNCTION FOR DEADLINE EXTRACTION
def get_deadline(text):
    today = datetime.now()
    text = text.lower()

    days_map = {
        "monday": 0,
        "tuesday": 1,
        "wednesday": 2,
        "thursday": 3,
        "friday": 4,
        "saturday": 5,
        "sunday": 6
    }

    days_to_add = 0

    if "tomorrow" in text:
        days_to_add = 1

    elif "next week" in text:
        days_to_add = 7

    else:
        for day in days_map:
            if day in text:
                target = days_map[day]
                current = today.weekday()

                # ✅ FIXED: same day = 0 (Today)
                diff = (target - current + 7) % 7
                days_to_add = diff
                break

    future = today + timedelta(days=days_to_add)

    # FORMAT OUTPUT
    if days_to_add == 0:
        return future.strftime("%d-%m-%Y") + " (Today)"
    elif days_to_add == 1:
        return future.strftime("%d-%m-%Y") + " (1 day)"
    else:
        return future.strftime("%d-%m-%Y") + f" ({days_to_add} days)"

   # MAIN API ENDPOINT
@app.post("/process")
def process(data: RequestData):

    text = data.transcript
    members = data.team_members

    sentences = [s.strip() for s in text.split('.') if s.strip()]
    summary = ". ".join(sentences[:2])

    tasks = []

    for s in sentences:
        if "will" in s.lower() or "should" in s.lower() or "need to" in s.lower():

            assigned_to = None

            # assign task based on name
            for m in members:
                if m.lower() in s.lower():
                    assigned_to = m
                    break

            #fallback assignment
            if not assigned_to:
                assigned_to = random.choice(members) if members else "Team"

            tasks.append({
                "task": s,
                "assigned_to": assigned_to,
                "deadline": get_deadline(s),
                "priority": "High" if "urgent" in s.lower() else "Medium",
                "status": "Pending"
            })

    #fallback if no tasks
    if not tasks:
        tasks.append({
            "task": "Prepare report",
            "assigned_to": "Team",
            "deadline": get_deadline("tomorrow"),
            "priority": "Medium",
            "status": "Pending"
        })

    return {
        "summary": summary,
        "tasks": tasks
    }