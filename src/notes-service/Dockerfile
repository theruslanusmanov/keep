FROM golang:1.18-alpine as builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o /notes-service

EXPOSE 8080

ENTRYPOINT ["/notes-service"]