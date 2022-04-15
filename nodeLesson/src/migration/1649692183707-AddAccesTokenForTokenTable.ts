import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccesTokenForTokenTable1649692183707 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Tokens ADD COLUMN accessToken VARCHAR(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Tokens DROP COLUMN accessToken
        `);
    }
}
