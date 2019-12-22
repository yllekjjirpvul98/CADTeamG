# Session JSON object
import random
import json
import uuid
from backend.db import getAllSession


class Session(object):
    def __init__(self, hostId, title, location, starttime, endtime, votingtime, weekends):
        self.hostId = hostId
        self.title = title
        self.location = location
        self.participants = [hostId]
        self.starttime = starttime
        self.endtime = endtime
        self.votingtime = votingtime
        self.weekends = weekends
        self.code = str(uuid.uuid4())[:8]
        ## validate if code not already exists, regenerate if neccessary
        sessions = getAllSession()
        ifExist = True
        while ifExist:
            if session['id'].exists(self.code):
                    self.code = str(uuid.uuid4())[:8]
                    continue
            else:
                ifExist = False
            
                    
            
                    

        
