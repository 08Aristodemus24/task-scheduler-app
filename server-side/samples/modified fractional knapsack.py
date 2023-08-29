import datetime as dt


class Item:
    def __init__(self, task_name, est_days, deadline, deadline_val, difficulty):
        self.task_name = task_name
        self._est_days = est_days
        self._deadline = deadline
        self.deadline_val = deadline_val
        self.difficulty = difficulty
    
    @property
    def value(self):
        # this is a property that will calculate the
        # value using the values of deadline_val, est_days, difficulty
        return self._est_days + self.deadline_val + self.difficulty

    @property
    def weight(self):
        return self._est_days

    @property
    def ratio(self):
        return self.value // self.weight

    @property
    def deadline(self):
        return self._deadline

    def __lt__(self, other):
        # this dunder method allows objects to use
        # less than sign on the instance of the object
        return self.ratio < other.ratio

    def __repr__(self):
        return (
            "task name: {}\nestimated days to work on task: {}\ndeadline: {}\ndeadline value: {}\ndifficulty: {}".format(
                self.task_name, 
                self._est_days, 
                self._deadline, 
                self.deadline_val, 
                self.difficulty
            )
        )


def enterWorkHours(present, deadline):

    present_day_start = dt.datetime.strptime("{}:{}:{}".format(
        present.hour, 
        present.minute,
        present.second
    ), "%H:%M:%S")

    present_day_end = dt.datetime.strptime("23:59:59", "%H:%M:%S")

    curr_day = []
    other_days = []

    curr_sum_hrs = dt.timedelta()
    other_sum_hrs = dt.timedelta()

    while input("Y/N: ").lower() == 'y':

        print("format: H:M:S")
        start_time = input("start time: ")
        end_time = input("end time: ")

        temp_start = dt.datetime.strptime(start_time, "%H:%M:%S")
        temp_end = dt.datetime.strptime(end_time, "%H:%M:%S")

        if present_day_start <= temp_start <= present_day_end or present_day_start <= temp_end <= present_day_end:
            if bool(curr_day) is False:
                curr_day.append([temp_start, temp_end])
                curr_sum_hrs = curr_sum_hrs + (temp_end - temp_start)

                print("curr day: {}".format(curr_sum_hrs))

            else:
                flag = True
                for time in curr_day:
                    # if any new entered time collides with any time in the array
                    # then break loop's checking and don't add the value
                    if time[0] <= temp_start <= time[1] or time[0] <= temp_end <= time[1] or (temp_start <= time[0] and temp_end >= time[1]):
                        flag = False
                        break
                
                if flag is True:
                    curr_day.append([temp_start, temp_end])
                    curr_sum_hrs = curr_sum_hrs + (temp_end - temp_start)
                    print("curr day: {}".format(curr_sum_hrs))
                
                else:
                    print("time entered collided")

        # check if present to deadline has days
        if (deadline - present).days > 0:
            if bool(other_days) is False:
                other_days.append([temp_start, temp_end])
                other_sum_hrs = other_sum_hrs + (temp_end - temp_start)
                print("other days: {}".format(other_sum_hrs))

            else:
                flag = True
                for time in other_days:
                    # if any new entered time collides with any time in the array
                    # then break loop's checking and don't add the value
                    if time[0] <= temp_start <= time[1] or time[0] <= temp_end <= time[1] or (temp_start <= time[0] and temp_end >= time[1]):
                        flag = False
                        break
                
                if flag is True:
                    other_days.append([temp_start, temp_end])
                    other_sum_hrs = other_sum_hrs + (temp_end - temp_start)
                    print("other days: {}".format(other_sum_hrs))
                
                else:
                    print("time entered collided")

    print(curr_day)
    print(other_days)
    print(curr_sum_hrs, other_sum_hrs)

    # return sum hours since this is the only
    # vital value needed
    return curr_sum_hrs + (other_sum_hrs * (deadline - present).days)


def createTasks():
    tasks_arr = []
    items = []

    while True:
        try:
            task_dict = {}
            if int(input()) == 0:
                break

            task_name = input('task name: ')
            est_days = float(input('estimated days to work on task: '))
            difficulty = int(input('difficulty of task (1 - 5): '))
            deadline = dt.datetime.strptime(
                '{} 23:59:59'.format(input('date of deadline: ')),
                '%B %d %Y %H:%M:%S'
            )

            if (1 <= int(difficulty) <= 5) is False:
                raise ValueError('Constraints are bounded within 1 and 5 only')

            # a key in the dictionary is still created unless
            # ether et_days or difficulty raises an error
            task_dict['task_name'] = task_name
            task_dict['est_days'] = est_days
            task_dict['deadline'] = deadline
            task_dict['difficulty'] = difficulty
            
            tasks_arr.append(task_dict)
        
        except ValueError as err:
            print('Error! {}'.format(err))
    
    if bool(tasks_arr) is True:
        # sort array based on deadline of each task
        sorted_tasks = sorted(tasks_arr, key=lambda task: task['deadline'], reverse=True)
        
        # create value for each deadline by creating corresponding
        # item objects for it
        items = [Item(task['task_name'], task['est_days'], task['deadline'], index, task['difficulty']) for index, task in enumerate(sorted_tasks)]

    return items


def getMaxVal(task_arr, capacity):

    CAP = capacity
    # sorting items by ratio of value and weight 
    # respectively in descending order
    temp = sorted(task_arr, reverse=True)
    print(temp, '\n')

    totalValue = 0
    knapsack = []
    for index, task in enumerate(temp):
        curWt = task.weight
        curVal = task.value

        # when capacity has still space then subtract the capacity
        # with the item's corresponding weight
        if CAP - curWt >= 0:
            CAP -= curWt
            totalValue += curVal

            # display the weight or est_days in elapsed time format
            temp_est_days = dt.timedelta(days=curWt)
            elapsed_time = "{}:{}:{}".format(
                temp_est_days.days * 24 + temp_est_days.seconds // 3600,
                (temp_est_days.seconds % 3600) // 60,
                temp_est_days.seconds % 60
            )
            knapsack.append([curVal, elapsed_time, index])

        # should the next important item have its weight exceed the
        # maximum capacity then fractionate the weight of this item to
        # as well as its value to fit the knapsack
        else:
            fraction = CAP / curWt
            
            # display the weight or est_days in elapsed time format
            temp_est_days = dt.timedelta(days=curWt * fraction)
            elapsed_time = "{}:{}:{}".format(
                temp_est_days.days * 24 + temp_est_days.seconds // 3600,
                (temp_est_days.seconds % 3600) // 60,
                temp_est_days.seconds % 60
            )
            knapsack.append([curVal * fraction, elapsed_time, index])

            # when the items val is fracionated get this value
            # and store it in an array allow with its fracitonated weight
            totalValue += curVal * fraction

            # this will set the capacity to 0 now 
            CAP = int(CAP - (curWt * fraction))
            break

    print(knapsack, '\n')
    return totalValue


def util(task_arr):
    if bool(task_arr) is True:
        present = dt.datetime.now()
        month = present.strftime("%B")
        day = present.day
        year = present.year
        hours = present.hour
        minute = present.minute
        second = present.second
        present = dt.datetime.strptime("{} {} {} {}:{}:{}".format(
            present.strftime("%B"), 
            present.day, 
            present.year, 
            present.hour, 
            present.minute + 1, 
            0
        ), "%B %d %Y %H:%M:%S")
        
        deadline = task_arr[-1].deadline
        diff = (deadline - present)

        # because diff of deadline and present is a timedelta object in
        # format of days and seconds format the object again to seconds
        # then convert to days
        capacity_days = diff.total_seconds() / 86400
        capacity_ET = "{}:{}:{}".format(
            diff.days * 24 + diff.seconds // 3600,
            (diff.seconds % 3600) // 60,
            diff.seconds % 60
        )
        print('\ndays: {}'.format(capacity_days))
        print('elapsed time: {}'.format(capacity_ET))
        return getMaxVal(task_arr, capacity_days)

    else:
        print('no tasks entered')


if __name__ == "__main__":
    task_arr = createTasks()
    util(task_arr)
    
