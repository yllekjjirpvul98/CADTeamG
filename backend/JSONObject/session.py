# Session JSON object
import random
import json
import uuid

class Session(object):
    def __init__(self, hostId, title, location, duration, starttime, endtime, votingtime, weekends):
        self.hostId = hostId
        self.title = title
        self.location = location
        self.duration = duration
        self.participants = [hostId]
        self.starttime = starttime
        self.endtime = endtime
        self.votingtime = votingtime
        self.weekends = weekends
        ## TODO: validate if code not already exists, regenerate if neccessary
        self.code = str(uuid.uuid4())[:8]
