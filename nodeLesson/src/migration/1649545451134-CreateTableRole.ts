import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRole1649545451134 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Role (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                role VARCHAR(10) NOT NULL DEFAULT('user'),
                userId INT NOT NULL,
                FOREIGN KEY(userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP 
        )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS Role 
        `);
    }
}
