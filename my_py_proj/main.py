
from typing import Optional
import uvicorn
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from karas import modelCreate, modelTrain, modelPredict
from fastapi import FastAPI
from starlette.responses import JSONResponse

app = FastAPI()

orgn = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=orgn,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Rocky(BaseModel):
    canvas: List[int]
    number: int

class Pepe(BaseModel):
    canvas: List[int]


@app.get("/")
def read_root():
    return {"I am root"}

@app.post("/train/")
def train(myRocky: Rocky):
    modelTrain(myRocky.canvas, myRocky.number)

@app.post("/predict/")
def devine(myPepe: Pepe):
    predict = modelPredict(myPepe.canvas)
    return JSONResponse(content=predict.tolist())

