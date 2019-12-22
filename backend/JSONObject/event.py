# event JSON object
class Event(object):
    def __init__(self, userid, username, title, location, starttime, endtime):
        self.userid = userid
        self.username = username
        self.title = title
        self.location = location
        self.starttime = starttime
        self.endtime = endtime
    
