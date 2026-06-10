---
title: How to Deploy a FastAPI App
---

# How to Deploy FastAPI

FastAPI is a great framework for Python APIs. It is fast and easy to use.
You can deploy it on many platforms.

## Installation

First install FastAPI:
pip install fastapi uvicorn

Then create your app:
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

## Deployment Options

You can deploy on Render, Railway, or Heroku.
They all work well. Choose the one you like.

## Conclusion

FastAPI is good. Use it for your next API project.

(This is a deliberately thin example - the optimizer will significantly
improve it when you paste it into the Optimize Blog form.)
