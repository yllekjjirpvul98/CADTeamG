import maya

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
        return (sortslots(less)+equal+sortslots(greater))  # Just use the + operator to join lists
    else:  # You need to handle the part at the end of the recursion - when you only have one element in your array, just return the array.
        return (timeslot_list)

def generateList(timeslot_list):
    sorted_timeslot = sortslots(timeslot_list)

    starttime = 1
    endtime = 3
    duration = 1

    avaliable_list = []
    newtuple = sorted_timeslot[0]
    for x in range(len(sorted_timeslot)-1):
        if (newtuple[0] < sorted_timeslot[x+1][0]) and (newtuple[1] > sorted_timeslot[x+1][1]):
            newtuple = newtuple
        elif newtuple[1] > sorted_timeslot[x+1][0] :
            newtuple = (newtuple[0], sorted_timeslot[x+1][1])
        else:
            a1 = (newtuple[1],sorted_timeslot[x+1][0])
            print (a1)
            if a1[0] < starttime:
                a1 = (starttime, sorted_timeslot[x+1][0])
            if a1[1] > endtime:
                a1 = (newtuple[1],endtime)
            if (a1[0] >= starttime) and (a1[1] <= endtime) and ((a1[1]-a1[0]) >= duration):
                avaliable_list.append(a1)
            newtuple = sorted_timeslot[x+1]
    return avaliable_list   

def test2():
    dt = maya.parse('2019-12-29T23:50:00.000Z').datetime().timestamp()
    return dt
import datetime
def test():
    weekend = 1578739800.0
    print(datetime.datetime.fromtimestamp(weekend).weekday())

if __name__ == "__main__":
    test()
    # print (test2())
    

