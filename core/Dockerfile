FROM python:3.10-slim

WORKDIR /app

COPY poetry.lock pyproject.toml ./

RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

COPY project ./project
COPY app.py .

CMD [ "python", "app.py"]