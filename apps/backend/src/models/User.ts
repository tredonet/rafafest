import { IsOptional, IsString } from "class-validator"
import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

@Entity()
export class User {
	@IsOptional()
    @ObjectIdColumn()
    id?: ObjectID

	@IsString()
    @Column()
    username: string

	@IsString()
    @Column()
    password: string
}
