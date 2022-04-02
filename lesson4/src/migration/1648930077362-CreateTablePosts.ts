import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePosts1648930077362 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Posts',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment',
                },

                {
                    name: 'Tytle',
                    type: 'varchar',
                    width: 250,
                    isUnique: true,
                    isNullable: false,

                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Posts', true);
    }
}
