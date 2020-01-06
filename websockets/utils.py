import maya
import datetime

def sortslots(timeslot_list):
    less = []
    equal = []
    greater = []

    if len(timeslot_list) > 1:
        pivot = timeslot_list[0]
        for x in timeslot_list:
            if x[0] < pivot[0]:
                less.append(x)
            elif x[0] == pivot[0]:
                equal.append(x)
            elif x[0] > pivot[0]:
                greater.append(x)
        return (sortslots(less)+equal+sortslots(greater))  
    else: 
        return (timeslot_list)

def generateTimeslots(room, events):
    # ROOM [object] use @starttime (earliest), @endtime (latest), @weekends, @duration
    # EVENTS [array] use @starttime, @endtime
    #TODO: Weekend/EVENTS=OCCURANCE?
    timeslot_list = []
    starttime = maya.parse(room.get('starttime')).datetime().timestamp()
    endtime = maya.parse(room.get('endtime')).datetime().timestamp()

    for event in events:
        event_starttime = maya.parse(event['starttime']).datetime().timestamp()
        event_endtime = maya.parse(event['endtime']).datetime().timestamp()

        timetuple = (event_starttime, event_endtime)
        if (timetuple[0] < endtime) and (timetuple[1] > starttime):
            if timetuple[0] < starttime:
                timetuple = (starttime, timetuple[1])
            if timetuple[1] > endtime:
                timetuple = (timetuple[0], endtime)
            timeslot_list.append(timetuple)


    # quick sort events by its starttime
    if len(timeslot_list) == 0:
        sorted_timeslot = []
    else:
        sorted_timeslot = sortslots(timeslot_list)

    duration =room.get('duration') * 60
    print (starttime, endtime, duration)

    print ("start to sort")
    avaliable_list = []
    if len(sorted_timeslot) == 0:
        a1 = (starttime, endtime)
        avaliable_list.append(a1)
        print('available_list 0', avaliable_list)
        print(avaliable_list)
    elif len(sorted_timeslot) == 1:
        newtuple = sorted_timeslot[0]
        if(starttime != newtuple[0]):
            a1 = (starttime, newtuple[0])
            avaliable_list.append(a1)
            print('available_list 1', avaliable_list)

        if(endtime != newtuple[1]):
            a2 = (newtuple[1], endtime)
            avaliable_list.append(a2)
            print('available_list 2', avaliable_list)
    else:
        print('available_list', avaliable_list)
        newtuple = sorted_timeslot[0]
        for x in range(len(sorted_timeslot)-1):
            if (newtuple[0] < sorted_timeslot[x+1][0]) and (newtuple[1] > sorted_timeslot[x+1][1]):
                newtuple = newtuple
            elif newtuple[1] > sorted_timeslot[x+1][0] :
                newtuple = (newtuple[0], sorted_timeslot[x+1][1])
            else:
                a1 = (newtuple[1],sorted_timeslot[x+1][0])
                print(a1)
                if (a1[1]-a1[0]) >= duration:
                    avaliable_list.append(a1)
                newtuple = sorted_timeslot[x+1]
    print('sorted_timeslot', sorted_timeslot)
    print('available_list', avaliable_list)
    # sliding timeslots by hours
    print ("start to slide")
    print (avaliable_list)
    p_list = []
    for slot in avaliable_list:
        left = slot[0]
        right = slot[1]
        d = duration 
        p = left
        while ( p + d <= right):
            p_list.append(p)
            p = p + d
    print ("slide", p_list)

    # remove weekend if weekend flag = true
    print ("start to check weekend")
    print(room.get('weekends'))
    if not room.get('weekends'):
        p_list = [x for x in p_list if not datetime.datetime.fromtimestamp(x).weekday() >= 5]

    print (p_list)
    p_list = map(lambda x: from_timestamp_to_string(x), p_list)
    print (p_list)
    # which type of date is needed to be returned 
    # return ['2019-12-29T23:50:00.000Z', '2019-12-30T12:00:00.000Z']
    return list(p_list)

def from_timestamp_to_string(p):
    return datetime.datetime.fromtimestamp(p).isoformat()