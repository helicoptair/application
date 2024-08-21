using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Tair.Infrastructure.Data.Migrations
{
    public partial class Inserindo_artigos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Artigos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Titulo = table.Column<string>(type: "varchar(100)", nullable: false),
                    Resumo = table.Column<string>(type: "varchar(100)", nullable: false),
                    EscritoPor = table.Column<string>(type: "varchar(100)", nullable: false),
                    Html = table.Column<string>(type: "varchar(100)", nullable: false),
                    FotoCapa = table.Column<string>(type: "varchar(100)", nullable: false),
                    UrlArtigo = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artigos", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Artigos");
        }
    }
}
