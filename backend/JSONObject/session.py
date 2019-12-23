# Session JSON object
import random
import json
import uuid
# from db import getAllSession


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
        self.code = str(uuid.uuid4())[:8]

        #TODO: You do not need a getAllSession! You just need to query whether there is a record such that session.code = code by checking whether the list return has length zero!!!
        ## validate if code not already exists, regenerate if neccessary
        # sessions = getAllSession()
        # ifExist = True
        # while ifExist:
        #     if session['id'].exists(self.code):
        #             self.code = str(uuid.uuid4())[:8]
        #             continue
        #     else:
        #         ifExist = False
            
                    
            
                    

        
