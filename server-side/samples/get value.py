from datetime import datetime
       


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
        dates.sort(key = lambda date: datetime.strptime(date, '%d %b %Y'))

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


def getRank():
    # the easier the task the least it is a priority
    ranks = {
        'easy': 0,
        'somewhat easy': 1,
        'average': 2,
        'somewhat difficult': 3,
        'difficult': 4
    }

    # in every input of the user the user must
    # indicate how difficult the task is
    pass

def getTimeTaken():
    pass


# one must take a leap of faith first and consider all the factors
# the value part of the item and the weight part of the item


if __name__ == "__main__":
    # dates =  ["23 Jun 2018", "2 Dec 2017", "11 Jun 2018", 
    #           "01 Jan 2019", "10 Jul 2016", "01 Jan 2007"]  
      
    # # sort the list in ascending order of dates 
    # dates.sort(key = lambda date: datetime.strptime(date, '%d %b %Y'))
    
    # # print the dates in a sorted order 
    # print(dates)
    getImportance()

