FROM golang:1.18-alpine as builder
WORKDIR /src

# restore dependencies
COPY go.mod go.sum ./
RUN go mod download

COPY . .

EXPOSE 8080
CMD go run .