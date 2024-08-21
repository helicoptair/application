using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Tair.Infrastructure.Data.Migrations
{
    public partial class InserindoVoos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Voos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TempoDeVooMinutos = table.Column<int>(type: "int", nullable: false),
                    QuantidadePax = table.Column<int>(type: "int", nullable: false),
                    TipoDeVoo = table.Column<int>(type: "int", nullable: false),
                    CategoriaDeVoo = table.Column<int>(type: "int", nullable: false),
                    PrecoPix = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PrecoCartao = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voos", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Voos");
        }
    }
}
