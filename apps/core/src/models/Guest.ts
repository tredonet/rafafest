import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

//Where did Raphael really got to know the guest
type Cirlce = "wolfach" | "childhood" | "hometown" | "university" | "vlc" | "bolt" | "gigtor" | "hungary"

type Diet = "vegetarian" | "vegan" | "lactose-free" | "gluten-free" | "soy-free" | "nut-free"

@Entity()
export class Guest {

    @ObjectIdColumn()
    id?: ObjectID

    @Column()
    name: string

    @Column()
    surname: string

    @Column()
    email: string

    @Column()
    code: string

    @Column()
    attendenceDates?: string[]

    @Column()
    attending: "yes" | "no" | "maybe" | undefined

    @Column()
    activities?: string[]

    @Column()
    invites: number

    @Column()
    friends: string[]

    @Column()
    dietryPreference: Diet[]

    @Column()
    active: boolean

    @Column()
    circle: Cirlce

    @Column()
    yearOfAcquaintance: number

    @Column()
    placeOfAcquaintance: number

}
