# event JSON object
class Event(object):
    def __init__(self, eventid, starttime, endtime, repeatable, location, title, hostFlag):
        self.eventid = eventid
        self.starttime = starttime
        self.endtime = endtime
        self.repeatable = repeatable
        self.location = location
        self.title = title
        self.hostFlag = hostFlag
    
