import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
} from "class-validator";
import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

//Where did Raphael really got to know the guest
export type Circle =
	| "wolfach"
	| "freiburg"
	| "utrecht"
	| "budabest"
	| "valencia"
	| "bolt"
	| "nagua"
	| "gigtor"
	| "alongtheway";

type Diet =
	| "vegetarian"
	| "vegan"
	| "lactose-free"
	| "gluten-free"
	| "soy-free"
	| "nut-free";

@Entity()
export class Guest {
	@IsOptional()
	@ObjectIdColumn()
	id?: ObjectID;

	@IsString()
	@Column()
	name: string;

	@IsString()
	@Column()
	surname: string;

	@IsString()
	@Column()
	email: string;

	@IsString()
	@Column()
	code: string;

	@IsObject()
	@Column()
	attendenceDates: {
		from: string;
		to: string;
	};

	@IsOptional()
	@IsString()
	@Column()
	attending: "yes" | "no" | "maybe" | undefined;

	@IsArray()
	@IsString({ each: true })
	@Column()
	activities: string[];

	@IsNumber()
	@Column()
	invites: number;

	@IsArray()
	@IsString({ each: true })
	@Column()
	friends: string[];

	@IsArray()
	@IsString({ each: true })
	@Column()
	dietryPreference: Diet[];

	@IsBoolean()
	@Column()
	active: boolean;

	@IsString()
	@Column()
	circle: Cirlce;

	@IsNumber()
	@Column()
	yearOfAcquaintance: number;

	@IsNumber()
	@Column()
	yearsShared: number;
}
