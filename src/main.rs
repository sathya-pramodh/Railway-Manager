mod routes;

use crate::routes::root::root;
use actix_files as fs;
use actix_web::{web, App, HttpRequest, HttpServer, Result};
use dotenv::dotenv;

async fn index(_req: HttpRequest) -> Result<fs::NamedFile> {
    Ok(fs::NamedFile::open("./website/dist/index.html")?)
}

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
            .default_service(web::get().to(index))
    })
    .bind((host, port))?
    .run()
    .await
}
