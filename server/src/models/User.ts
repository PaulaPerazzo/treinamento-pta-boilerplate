import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

} 

/* CREATE TABLE user
ALTER TABLE user INSERT COLUMN firstName
ALTER TABLE user INSERT COLUMN lastName
ALTER TABLE user INSERT COLUMN age
 */