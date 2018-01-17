import requests
import json
import time as timelib

class Scalar():
	def __init__(self, scalar, client):
		self.name = scalar["name"]
		self.id = scalar["id"]
		self.values = scalar["values"]
		self.times = scalar["times"]
		self.client = client
		self.times_que = []
		self.values_que = []
		self.last_sent = 0
	
	def __str__(self):
		return "Scalar %s\nID: %s\n%d values\n%d values in que" % (self.name, self.id, len(self.values), len(self.values_que))

	def format_que(self, q):
		s = '['
		for i, n in enumerate(q):
			if i != 0:
				s += ',' 
			s += str(n)

		return s + ']'

	def add_value(self, value, time=-1, batch_wait_time=10):
		if time == -1:
			time = int(timelib.time())

		self.values_que.append(value)
		self.times_que.append(time)

		current_time = int(timelib.time())

		if current_time - self.last_sent >= batch_wait_time:
			values = self.format_que(self.values_que)
			times = self.format_que(self.times_que)
			body = { "query": "mutation{addMultipleScalarValues(scalarId: \"%s\", values: %s, times: %s){values times}}" % (self.id, values, times) }

			r = requests.post(self.client.url + "/graphql", json=body)
			if not r.ok:
				raise ValueError("Something went wrong. Error message: " + r.text)
			else:
				self.last_sent = current_time
				self.values_que = []
				self.times_que = []
				scalar = json.loads(r.text)["data"]["addMultipleScalarValues"]
				self.values = scalar["values"]
				self.times = scalar["times"]
		return self



class Experiment():
	def __init__(self, experiment, client):
		self.name = experiment["name"]
		self.id = experiment["id"]
		self.scalars = experiment["scalars"]
		self.client = client
	
	def __str__(self):
		return "Experiment %s\nID: %s" % (self.name, self.id)

	def get_scalar(self, name=None, id=None):
		for s in self.scalars:
			if id == None:
				if s["name"] == name:
					return Scalar(s, self.client)
			else:
				if s["id"] == id:
					return Scalar(s, self.client)
		return None
			
	
	def create_scalar(self, name):
		body = {"query": "mutation{createScalar(name: \"%s\", experimentId: \"%s\"){ name id values times}}" % (name, self.id) }

		r = requests.post(self.client.url + "/graphql", json=body)
		if not r.ok:
			raise ValueError("Something went wrong. Error message: " + r.text)
		else:
			scalar = json.loads(r.text)["data"]["createScalar"]
			self.scalars.append(scalar)
			return Scalar(scalar, self.client)


class BoardClient():
	def __init__(self, url):
		self.url = url

		r = requests.get(self.url + '/ping')

		if (not r.ok) or r.text != "Pytorch Board":
			raise ValueError("Could not reach client. Error message: " + r.text)

	def get_experiment(self, id):
		body = {"query": "query{experiment(id: \"%s\"){id name scalars { name id values times}}}" % (id)}

		r = requests.post(self.url + "/graphql", json=body)
		if not r.ok:
			raise ValueError("Something went wrong. Error message: " + r.text)
		else:
			data = json.loads(r.text)["data"]
			return Experiment(data["experiment"], self)
		

	def create_experiment(self, name):
		body = {"query": "mutation{createExperiment(name: \"%s\"){name id scalars { name id values times} }}" % (name) }


		r = requests.post(self.url + "/graphql", json=body)
		if not r.ok:
			raise ValueError("Something went wrong. Error message: " + r.text)
		else:
			data = json.loads(r.text)["data"]
			return Experiment(data["createExperiment"], self)


if __name__ == '__main__':
	client = BoardClient("http://localhost:3000")

	experiment = client.get_experiment("S1nZO8ING")

	scalar = experiment.get_scalar("Loss")

	scalar.add_value(1.23)
	scalar.add_value(1.25)

	print(experiment.get_scalar(id="Byezek8LNz"))

	print(scalar)

	timelib.sleep(15)
	scalar.add_value(1.05)

	print('')
	print(scalar)