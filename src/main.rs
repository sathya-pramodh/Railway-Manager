mod api;
mod types;

use std::path::Path;

use actix_files as fs;
use actix_web::{
    middleware::Logger,
    web::{self, Data},
    App, HttpRequest, HttpServer, Result,
};
use api::{
    add_booking::add_booking, get_history::get_history, login::login, logout::logout, remove_booking::remove_booking, search_by_dest::search_by_dest, search_by_price::search_by_price, search_by_train_id::search_by_train_id, sign_up::sign_up
};
use dotenv::dotenv;
use mysql::Pool;
use types::db;

async fn index(_req: HttpRequest) -> Result<fs::NamedFile> {
    Ok(fs::NamedFile::open(
        Path::new(".")
            .join("website")
            .join("dist")
            .join("index.html"),
    )?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();

    let srv_host = match dotenv::var("SRV_HOST") {
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
    let db_host = match dotenv::var("DB_HOST") {
        Ok(host) => host,
        Err(err) => return Ok(eprintln!("No 'DB_HOST' found: {}", err)),
    };
    let db_port = match match dotenv::var("DB_PORT") {
        Ok(port) => port,
        Err(err) => return Ok(eprintln!("No 'DB_PORT' found: {}", err)),
    }
    .parse::<u16>()
    {
        Ok(port) => port,
        Err(err) => return Ok(eprintln!("Unable to parse 'DB_PORT' to u16: {}", err)),
    };
    let db_user = match dotenv::var("DB_USER") {
        Ok(user) => user,
        Err(err) => return Ok(eprintln!("No 'DB_USER' found: {}", err)),
    };
    let db_password = match dotenv::var("DB_PWD") {
        Ok(pwd) => pwd,
        Err(err) => return Ok(eprintln!("No 'DB_PWD' found: {}", err)),
    };
    let db_name = match dotenv::var("DB_NAME") {
        Ok(name) => name,
        Err(err) => return Ok(eprintln!("No 'DB_PWD' found: {}", err)),
    };

    let url = format!(
        "mysql://{}:{}@{}:{}/{}",
        db_user, db_password, db_host, db_port, db_name
    );
    let pool = match Pool::new(url.as_str()) {
        Ok(pool) => pool,
        Err(err) => {
            return Ok(eprintln!(
                "Unable to make a pool for the mysql connection: {}",
                err
            ));
        }
    };
    println!(
        "Connected to mysql db '{}' at {}:{}",
        db_name, db_host, db_port
    );

    println!("Running at http://{}:{}", srv_host, port);
    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(pool.clone()))
            .service(search_by_dest)
            .service(search_by_price)
            .service(search_by_train_id)
            .service(login)
            .service(logout)
            .service(sign_up)
            .service(get_history)
            .service(add_booking)
            .service(remove_booking)
            .service(
                actix_files::Files::new("/", Path::new(".").join("website").join("dist"))
                    .index_file("index.html"),
            )
            .default_service(web::get().to(index))
            .wrap(Logger::default())
    })
    .bind((srv_host, port))?
    .run()
    .await
}

