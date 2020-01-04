import maya

def generateTimeslots(room, events):
    # ROOM [object] use @starttime (earliest), @endtime (latest), @weekends, @duration
    # EVENTS [array] use @starttime, @endtime
    # timeslot_list = []
    # for event in events:
    #     starttime = maya.parse(event['starttime']).datetime().timestamp()
    #     endtime =  maya.parse(event['endtime']).datetime().timestamp()
    #     timetuple = (starttime, endtime)
    #     timeslot_list.append(timetuple)
    # # quick sort events by its starttime
    # sorted_timeslot = sortslots(timeslot_list)

    # INTEGER 30MIN -> 0.5 INTEGER
    # starttime = maya.parse(room.get('starttime')).datetime().timestamp()
    # endtime =  maya.parse(room.get('endtime')).datetime().timestamp()
    # duration = maya.parse(room.get('duration')).datetime().timestamp()

    # available_list = []
    # newtuple = sorted_timeslot[0]
    # for x in range(len(sorted_timeslot)-1):
    #     if (newtuple[0] < sorted_timeslot[x+1][0]) and (newtuple[1] > sorted_timeslot[x+1][1]):
    #         newtuple = newtuple
    #     elif newtuple[1] > sorted_timeslot[x+1][0] :
    #         newtuple = (newtuple[0], sorted_timeslot[x+1][1])
    #     else:
    #         a1 = (newtuple[1],sorted_timeslot[x+1][0])
    #         print (a1)
    #         if a1[0] < starttime:
    #             a1 = (starttime, sorted_timeslot[x+1][0])
    #         if a1[1] > endtime:
    #             a1 = (newtuple[1],endtime)
    #         if (a1[0] >= starttime) and (a1[1] <= endtime) and ((a1[1]-a1[0]) >= duration):
    #             available_list.append(a1)
    #         newtuple = sorted_timeslot[x+1]

    # which type of date is needed to be returned 
    return ['2019-12-29T06:50:00.000Z', '2019-12-30T11:00:00.000Z']
    # print(available_list)
    # return available_list

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