# **REINTEGRATED INTO PRODUCTION FOR UPDATES** 

*an application of the fractional knapsack algorithm through a task scheduler application*

# Usage:
**Initial installation:**
1. clone repository by `git clone https://github.com/08Aristodemus24/task-scheduler-app.git`
2. navigate to `client-side` folder and install dependencies by entering `npm i` in terminal
3. to install python dependencies navigate to `server-side` folder with `requirements.txt` and `manage.py` file
4. enter `conda create -n <name of env e.g. task-scheduler-app-server> python=3.9.12` in terminal specifically in order to avoid package version conflicts

**Running client-side application:**
1. to run application make sure to be in `client-side` folder with `webpack.config.js` file
2. run `npm start` in terminal to start development server at port `8080`
3. write code

**Running server-side application**
1. once environment is created activate it by running command `conda activate`
2. then run `conda activate task-scheduler-app-server`
3. check if pip is installed by running `conda list -e`
4. if it is there then move to step 8, if not then install `pip` by typing `conda install pip`
5. if `pip` exists or install is done run `pip install -r requirements.txt` in the directory where `requirements.txt` is
6. once done installing you can run server on port `8000` by `python manage.py runserver`

# Client side tasks:
## Update react router code
**To do:**
1. update react router Switch component to be compatible to version 6. Solution: https://github.com/remix-run/react-router/discussions/8753
2. 