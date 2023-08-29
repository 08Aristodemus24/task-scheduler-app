import datetime as dt


class Task:
    def __init__(self, name, weight, deadline, difficulty=5):
        self.name = name
        self._weight = weight
        self._deadline = deadline

        # note that the higher the number the more difficult
        self.difficulty = difficulty

    @property
    def weight(self):
        return self._weight

    @property
    def deadline(self):
        return self._deadline

    @weight.setter
    def weight(self, new_weight):
        self._weight = new_weight

    def __repr__(self):
        return self._weight


def diff(d1, d2):
    d1 = dt.datetime.strptime(d1, "%d %b %Y")
    d2 = dt.datetime.strptime(d2, "%d %b %Y")
    return abs((d2 - d1).days)

def getImportance():
    # subjects and dates
    unsorted_tasks = {}

    # sorted dates
    sorted_dates = {}

    # subjects and corresponding importance value
    sorted_tasks = {}

    while True:
        if int(input()) == 0:
            break
        key = input('key: ')
        value = input('value: ')
        unsorted_tasks[key] = value
        

    if bool(unsorted_tasks) is True:
        # create array based on the dictionary
        dates = list(unsorted_tasks.values())

        # sort dates
        dates.sort(key = lambda date: dt.datetime.strptime(date, '%d %b %Y'))

        # create dictionary of dates as keys mapped to its 
        # index as its value
        # for index, date in enumerate(dates):
        #     sorted_dates[date] = index
        rank = 0
        for _ in range(len(dates) - 1, -1, -1):
            sorted_dates[dates[_]] = rank
            rank += 1

        # assign indeces of each newly sorted element to 
        for task in unsorted_tasks:
            sorted_tasks[task] = sorted_dates[unsorted_tasks[task]]

        print(unsorted_tasks)
        print(sorted_dates)
        print(sorted_tasks)
        

def enterTasks():
    tasks = []

    while True:
        try:
            name = input("task name: ")
            weight = float(input("estimated days to work on task: "))
            deadline = input("date of deadline: ")
            difficulty = int(input("difficulty: "))

            # raise error if user enters difficulty less than 1 or greater than 5
            # constraints: 1 <= difficulty <= 5
            if difficulty < 1 or difficulty > 5:
                raise ValueError('Error! Constraints are bounded within 1 and 5 only')
            
            tasks.append(Task(name, weight, deadline, difficulty))

            if int(input("end? ")) == 0:
                break

        except ValueError as err:
            print(err)

    return tasks
        
def enterWorkHours():
    # use a while loop such that use is able to enter as much 
    # start and end times as possible, in a corner case if 
    # user does not anything the first loop raise error since
    # there will be no sum_hrs to be used
    times = []
    sum_hrs = dt.timedelta()

    while input("Y/N").lower() == 'y':

        print("format: H:M:S")
        start_time = input("start time: ")
        end_time = input("end time: ")

        temp_start = dt.datetime.strptime(start_time, "%H:%M:%S")
        temp_end = dt.datetime.strptime(end_time, "%H:%M:%S")
        if bool(times) is False:
            times.append([temp_start, temp_end])
            sum_hrs = sum_hrs + (temp_end - temp_start)
            print(sum_hrs)

        else:
            flag = True
            for time in times:
                # if any new entered time collides with any time in the array
                # then break loop's checking and don't add the value
                if time[0] <= temp_start <= time[1] or time[0] <= temp_end <= time[1] or (temp_start <= time[0] and temp_end >= time[1]):
                    flag = False
                    break
            
            if flag is True:
                times.append([temp_start, temp_end])
                sum_hrs = sum_hrs + (temp_end - temp_start)
                print(sum_hrs)
            
            else:
                print("time entered collided")

    print(times, sum_hrs)

    # return sum hours since this is the only
    # vital value needed
    return sum_hrs


def transmuteDays(sum_hrs, tasks):
    for task in tasks:
        task.weight = task.weight * sum_hrs

    for task in tasks:
        print(task.weight)


def dateDetails():
    dates =  [
        "11 Jun 2021", 
        "10 Jun 2021", 
        "15 Jul 2021", 
        "05 Aug 2021", 
        "08 Jul 2021", 
        "01 Sep 2021"
    ]

    # temp_date = datetime.strptime(dates[0], '%d %b %Y')
    # print(temp_date)

    # get diff of curr date and deadlines
    curr_date = "06 Jun 2021"

    for temp_date in dates:
        print("difference of {} and {} is: {}".format(curr_date, temp_date, diff(curr_date, temp_date)))


    # temp_val = datetime.fromisoformat(str(temp_date)).timestamp()
    # print(temp_val)

if __name__ == "__main__":
    # dateDetails()
    tasks = enterTasks()
    sum_hrs = enterWorkHours()
    transmuteDays(sum_hrs, tasks)


# datetime.now() gets current date and time
# datetime.today() gets the current date in python
# datetime.now().time() gets the current time in python





