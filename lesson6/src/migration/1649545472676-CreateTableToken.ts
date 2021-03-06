import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableToken1649545472676 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Tokens (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                refreshToken VARCHAR(255) NOT NULL,
                userId INT NOT NULL,
                FOREIGN KEY(userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Tokens
        `);
    }
}
