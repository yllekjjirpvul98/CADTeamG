# event JSON object
class Event(object):
    def __init__(self, eventid, userid, starttime, endtime, repeatable, hostId, location, title):
        self.eventid = eventid
        self.userid = userid
        self.starttime = starttime
        self.endtime = endtime
        self.repeatable = repeatable
        self.hostId = hostId
        self.location = location
        self.title = title
    
