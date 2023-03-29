import os
from flask import Flask, request, jsonify, make_response
from project.project import Project
from project.capacity import Capacity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/',methods=['GET'])
def healthz():
    resp = jsonify(success=True)
    resp.status_code = 200
    return resp


@app.route('/capacity_analysis',methods=['POST'])
def run_capacity_analysis():

    args = request.args
    print(args)
    my_project = Capacity(
        float(args['yearlyLoanRate']),
        int(args['loanDuration']),
        float(args['maxdebtLoanRatio']),
        float(args['netMonthlyIncome']),
    )
    output = my_project.run()
    resp = make_response(jsonify(output), 200)
    return resp

@app.route('/project_analysis',methods=['POST'])
def run_project_analysis():

    args = request.args
    print(args)
    my_project = Project(
        float(args['yearlyLoanRate']),
        int(args['loanDuration']),
        float(args['loanAmount']),
        float(args['netMonthlyIncome']),
    )
    output = my_project.run()
    resp = make_response(jsonify(output), 200)
    return resp

if __name__ == "__main__":
    app.run(
        host=os.environ.get('EXPOSED_IP_ADDRESS', '127.0.0.1'),
        port=int(os.environ.get('PORT', 8080))
        )