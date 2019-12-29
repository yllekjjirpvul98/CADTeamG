# Session JSON object
import random
import json
import uuid

class Session(object):
    def __init__(self, hostId, title, location, duration, starttime, endtime, votingtime, weekends, availableSlots={}, vote={}):
        self.hostId = hostId
        self.title = title
        self.location = location
        self.participants = [hostId]
        self.starttime = starttime
        self.endtime = endtime
        self.votingtime = votingtime
        self.weekends = weekends
        self.code = str(uuid.uuid4())[:8]
        self.availableSlots = availableSlots
        self.vote = vote
                    
            
                    

        
