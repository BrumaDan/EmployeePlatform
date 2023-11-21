using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoffeeShopScheduler.Migrations
{
    /// <inheritdoc />
    public partial class AddeedLocationAndEmployeeModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    locationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StreetNumber = table.Column<int>(type: "int", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.locationId);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    employeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    contractType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    HourBank = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    locationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.employeeId);
                    table.ForeignKey(
                        name: "FK_Employee_Location",
                        column: x => x.locationId,
                        principalTable: "Locations",
                        principalColumn: "locationId");
                });

            migrationBuilder.CreateIndex(
                name: "idx_contractType",
                table: "Employees",
                column: "contractType");

            migrationBuilder.CreateIndex(
                name: "idx_locationId",
                table: "Employees",
                column: "locationId");

            migrationBuilder.CreateIndex(
                name: "idx_status",
                table: "Employees",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "idx_name",
                table: "Locations",
                column: "name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Locations");
        }
    }
}
