FROM rust:latest

RUN apt update -y && apt upgrade -y

COPY . .
RUN cargo build -r

CMD ["cargo", "run", "-r"]
