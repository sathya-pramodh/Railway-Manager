mod routes;
use actix_web::{App, HttpServer};
use dotenv::dotenv;
use routes::root::root;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let host = match dotenv::var("SRV_HOST") {
        Ok(host) => host,
        Err(err) => {
            return Ok(eprintln!("No 'SRV_HOST' found: {}", err));
        }
    };
    let port = match match dotenv::var("SRV_PORT") {
        Ok(port) => port,
        Err(err) => {
            return Ok(eprintln!("No 'SRV_PORT' found: {}", err));
        }
    }
    .parse::<u16>()
    {
        Ok(port) => port,
        Err(err) => return Ok(eprintln!("Unable to parse 'SRV_PORT' to u16: {}", err)),
    };
    println!("Running at http://{}:{}", host, port);
    HttpServer::new(|| {
        App::new()
            .service(root)
            .service(actix_files::Files::new("/", "./website/dist").index_file("index.html"))
    })
    .bind((host, port))?
    .run()
    .await
}
