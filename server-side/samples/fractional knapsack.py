class ItemValue: 
    """Item Value DataClass"""
 
    def __init__(self, wt, val, ind):
        self.wt = wt
        self.val = val
        self.ind = ind
        self.cost = val // wt

    # used in a 
    def __lt__(self, other):
        # returns either a true or false value
        # if true then a swap occurs between two of
        # the ItemValue objects being used for comparison
        return self.cost < other.cost

    def __repr__(self):
        return "[{}, {}]".format(self.val, self.wt)

# Greedy Approach
class FractionalKnapSack:
 
    """Time Complexity O(n log n)"""
    """function to get maximum value"""
    @staticmethod
    def getMaxValue(wt, val, capacity):
        # this will create an array of items that will contain the
        # info such as weight and its corresponding value vice versa
        iVal = []
        for i in range(len(wt)):
            iVal.append(ItemValue(wt[i], val[i], i))
 
        # sorting items by value
        iVal.sort(reverse=True)
        # print(iVal, '\n')

        totalValue = 0
        knapsack = []
        for index, i in enumerate(iVal):
            curWt = i.wt
            curVal = i.val

            # when capacity has still space then subtract the capacity
            # with the item's corresponding weight
            if capacity - curWt >= 0:
                capacity -= curWt
                totalValue += curVal

                knapsack.append([curVal, curWt, index])

            # should the next important item have its weight exceed the
            # maximum capacity then fractionate the weight of this item to
            # as well as its value to fit the knapsack
            else:
                fraction = capacity / curWt
                knapsack.append([curVal * fraction, curWt * fraction, index])

                # when the items val is fracionated get this value
                # and store it in an array allow with its fracitonated weight
                totalValue += curVal * fraction
                capacity = int(capacity - (curWt * fraction))
                break
            
        print(knapsack, '\n')
        return totalValue
 
 
# Driver Code
if __name__ == "__main__":
    # wt = [10, 40, 20, 30]
    # val = [60, 40, 100, 120]
    # capacity = 50

    # wt = [2, 1.5, 21]
    # val = [3, 1, 2]
    # capacity = 4

    wt = [40, 10, 20, 24]
    val = [280, 100, 120, 120]
    capacity = -1
 
    # Function call
    maxValue = FractionalKnapSack.getMaxValue(wt, val, capacity)
    print("Maximum value in Knapsack =", maxValue)


# the goal is modify this algorithm such that it returns all the indexes
# of all items that will be put in the knapsack, as well as their
# corresponding values and possibly fractionated values




# 50 - 30 = 20

# use this 20 to 


# if 2/3 * 30 = 20 to add to our 30kg all in all weight which would equal exactly 50

# then that means 2/3 * 120 also which is 80

