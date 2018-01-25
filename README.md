# PyBoard
Little app for tracking ML models learning progress. Built using React, Apollo (GraphQL) and Node.

## Getting started:
```
$ git clone https://github.com/c0z0/pyboard.git
$ cd pyboard
$ yarn install
$ yarn dev
  or
$ npm install
$ npm run dev
```

## Using the Python client example
```python
import pyboard # Copy pyboard.py in python project root
  
url = 'http:localhost:3000'
  
pyboard_client = pyboard.BoardClient(url)
  
mnist_experiment = pyboard.create_experiment('MNIST')
  
loss_logging = mnsit_experiment.createScalar('Loss')
accuracy_logging = mnsit_experiment.create_scalar('Accuracy')
  
#                         (...)
  
# In training loop:
loss_logging.add_value(loss, batchN)
accuracy_logging.add_value(acc, batchN)
```

## Python client API
```python
pyboard.BoardClient(url)
```
Creates a pyboard client.

Params:

```url``` Url of the pyboard server
```python
client.create_experiment(name)
```
Creates an experiment and returns it.
```python
client.get_experiment(id)
```
Finds experiment by id and returns it.
```python
 experiment.create_scalar(name)
```
Creates a scalar and returns it
```python
experiment.get_scalar(name, [id])
```
Finds scalar by name or id and returns it.
```python
experiment.name # Name of the experiment
experiment.id # Id of the experiment
```

```python
scalar.add_value(value, time, batch_wait_time=10)
```
Adds a value to the scalar

Params:

```value``` Value to add
```time``` Value to show on the time axis (Eg: epoch_number)
```batch_wait_time``` Time (in seconds) between request batches.


## Todo:
* Delete / Clear experiments and scalars
* Add a persistance layer (probably both fs and db) (currently the data is saved in memmory)
