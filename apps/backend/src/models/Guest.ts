import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

@Entity()
export class Guest {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

}
