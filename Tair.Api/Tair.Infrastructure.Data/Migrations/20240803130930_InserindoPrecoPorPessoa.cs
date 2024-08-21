using Microsoft.EntityFrameworkCore.Migrations;

namespace Tair.Infrastructure.Data.Migrations
{
    public partial class InserindoPrecoPorPessoa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PrecoPix",
                table: "Voos",
                newName: "PrecoPixTotal");

            migrationBuilder.RenameColumn(
                name: "PrecoCartao",
                table: "Voos",
                newName: "PrecoPixPessoa");

            migrationBuilder.AddColumn<decimal>(
                name: "PrecoCartaoPessoa",
                table: "Voos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PrecoCartaoTotal",
                table: "Voos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrecoCartaoPessoa",
                table: "Voos");

            migrationBuilder.DropColumn(
                name: "PrecoCartaoTotal",
                table: "Voos");

            migrationBuilder.RenameColumn(
                name: "PrecoPixTotal",
                table: "Voos",
                newName: "PrecoPix");

            migrationBuilder.RenameColumn(
                name: "PrecoPixPessoa",
                table: "Voos",
                newName: "PrecoCartao");
        }
    }
}
