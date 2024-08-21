using Microsoft.EntityFrameworkCore.Migrations;

namespace Tair.Infrastructure.Data.Migrations
{
    public partial class InserindoImagemNosVoos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagemGrande",
                table: "Voos",
                type: "varchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagemMedia",
                table: "Voos",
                type: "varchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagemPequena",
                table: "Voos",
                type: "varchar(100)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagemGrande",
                table: "Voos");

            migrationBuilder.DropColumn(
                name: "ImagemMedia",
                table: "Voos");

            migrationBuilder.DropColumn(
                name: "ImagemPequena",
                table: "Voos");
        }
    }
}
