# Session JSON object
import random
import json
import uuid

class Session(object):
    def __init__(self, hostId, title, location, starttime, endtime, duration, votingtime, weekends):
        self.hostId = hostId
        self.title = title
        self.location = location
        self.participants = [hostId]
        self.starttime = starttime
        self.endtime = endtime
        self.duration = int(duration)
        self.votingtime = int(votingtime)
        self.weekends = weekends
        self.code = str(uuid.uuid4())[:8].upper()
        self.votes = []
        self.timeslots = []
                    
            
                    

        
