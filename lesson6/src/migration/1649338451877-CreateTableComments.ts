import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableComments1649338451877 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Comments (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                text VARCHAR(255) NOT NULL,
                authorId INT NOT NULL,
                postId INT NOT NULL,
                FOREIGN KEY (authorId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
                _like INT DEFAULT(0),
                _dislike INT DEFAULT(0),
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Comments
        `);
    }
}
