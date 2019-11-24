# event JSON object
class Event(object):
    def __init__(self, userid, starttime, endtime, repeatable, hostFlag):
        self.userid = userid
        self.starttime = starttime
        self.endtime = endtime
        self.repeatable = repeatable
        self.hostFlag = hostFlag
