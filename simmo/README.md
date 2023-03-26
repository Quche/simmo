# Simmo back-end

## Run the server

### Local for developments
First, create a virtual env and reach the isolated environemnt. In this directory:
```bash
python3 -m venv .venv
source ./venv/bin/activate
```

Install the dependencies through poetry:
```bash
poetry install
```

To run the server:
```bash
python app.py
```

### Docker image

First, build the image:
```bash
cd simmo
docker build -t simmo-server .
```

Then run the image (reachable on `127.0.0.1:8082` in this example):
```bash
docker run --network=host --env PORT=8082 simmo-server
```