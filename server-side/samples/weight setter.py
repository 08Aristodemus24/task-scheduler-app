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


if __name__ == "__main__":
    task = Task("e comm", 10, "June 6 2021", 4)
    print(task.weight)

    task.weight = 11
    print(task.weight)
