use actix_files::NamedFile;
use actix_web::get;

#[get("/")]
pub async fn root() -> std::io::Result<NamedFile> {
    Ok(NamedFile::open("website/dist/index.html")?)
}
