from tensorflow import keras
import tensorflow as tf
import numpy as np
import os

def modelCreate():

	model = tf.keras.Sequential()
	model.add(tf.keras.layers.Input(shape=(20*20)))
	model.add(tf.keras.layers.Dense(50,activation = tf.nn.relu))
	model.add(tf.keras.layers.Dense(50,activation = tf.nn.relu))
	model.add(tf.keras.layers.Dense(50,activation = tf.nn.relu))
	model.add(tf.keras.layers.Dense(10,activation = tf.nn.softmax))
	model.compile(loss='binary_crossentropy', optimizer='Adam')
	model.summary()
	return model

def modelTrain(canvasTrain, expectedNbr):
	batch = 1
	epoch = 2
	try:
		model = tf.keras.models.load_model("modelTest.h5")
	except:
		model = modelCreate()

	train = np.reshape(canvasTrain, (1,400))
	outTabl = np.zeros([1,10])
	outTabl[0, expectedNbr] = 1
	model.fit(train, outTabl,batch_size = batch, epochs = batch)
	model.save("modelTest.h5")

def modelPredict(canvasPredict):
	
	model = tf.keras.models.load_model("modelTest.h5")
	predict = np.reshape(canvasPredict, (1,400))
	mylist = model.predict(predict)
	return mylist



