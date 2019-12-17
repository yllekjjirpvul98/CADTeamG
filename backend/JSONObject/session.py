# Session JSON object
import random
import json

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
        self.code = random.randint(0, 100) # Find a better way to generate code
