import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableActionTokens1650476355122 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS actionTokens (
                id INT PRIMARY KEY AUTO_INCREMENT,
                userId INT NOT NULL,
                actionToken VARCHAR(255) NOT NULL,
                FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
                createAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deleteAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS actionTokens
        `);
    }
}
