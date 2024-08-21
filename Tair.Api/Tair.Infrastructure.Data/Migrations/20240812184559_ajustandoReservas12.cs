using Microsoft.EntityFrameworkCore.Migrations;

namespace Tair.Infrastructure.Data.Migrations
{
    public partial class ajustandoReservas12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Voos_VooId",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_VooId",
                table: "Reservas");

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_VooId",
                table: "Reservas",
                column: "VooId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Voos_VooId",
                table: "Reservas",
                column: "VooId",
                principalTable: "Voos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Voos_VooId",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_VooId",
                table: "Reservas");

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_VooId",
                table: "Reservas",
                column: "VooId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Voos_VooId",
                table: "Reservas",
                column: "VooId",
                principalTable: "Voos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
